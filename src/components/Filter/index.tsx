import { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

import { FilterProps } from '../../types/filter/index';

import { formatString } from '../../utils/formatString';

import styles from './styles.module.css';

export function Filter(props: FilterProps) {
  const [initialPosition, setInitialPosition] = useState([0, 299.99]);

  return (
    <div className={`${styles.filter}`} id="filter">
      <select
        defaultValue=""
        name="size"
        id="size"
        className="form-control mb-3"
        onChange={(event) => props.handleFilter("sizeId", event.target.value)}
      >
        <option value="" disabled={true}>Tamanho</option>
        <option value="0">Todos os tamanhos</option>
        {props.sizes.map(
          size => <option key={size.id} value={size.id}>{size.name}</option>
        )}
      </select>

      <select
        defaultValue=""
        name="brand"
        id="brand"
        className="form-control mb-3"
        onChange={(event) => props.handleFilter("brandId", event.target.value)}
      >
        <option value="" disabled={true}>Marca</option>
        <option value="0">Todas as marcas</option>
        {props.brands.map(
          brand => <option key={brand.id} value={brand.id}>{brand.name}</option>
        )}
      </select>

      <select
        defaultValue=""
        name="type-product"
        id="type-product"
        className="form-control mb-3"
      >
        <option value="" disabled={true}>Tipo de produto</option>
        <option value="all">Todos os tipos de produto</option>
        <option value="camisa">Camisa</option>
      </select>

      <select
        defaultValue=""
        name="material"
        id="material"
        className="form-control mb-3"
        onChange={(event) => props.handleFilter("materialId", event.target.value)}
      >
        <option value="" disabled={true}>Material</option>
        <option value="0">Todos os materiais</option>
        {props.materials.map(
          material => <option key={material.id} value={material.id}>{material.name}</option>
        )}
      </select>

      <select
        defaultValue=""
        name="rating"
        id="rating"
        className="form-control mb-3"
        onChange={(event) => props.handleFilter("stars", event.target.value)}
      >
        <option value="" disabled={true}>Avaliações</option>
        <option value="0">Todas as avaliações</option>
        <option value="5">Cinco estrelas</option>
        <option value="4">Quatro estrelas</option>
        <option value="3">Três estrelas</option>
        <option value="2">Duas estrelas</option>
        <option value="1">Uma estrela</option>
      </select>

      {props.categories.map(category => {
        return (
          <div className={`${styles["filter-checkbox"]} mb-3`} key={category.id}>
            <input
              type="checkbox"
              name={formatString(category.name)}
              id={formatString(category.name)}
              onChange={(event) => {
                event.currentTarget.checked ? props.addCategoryInFilter(category.id)
                                            : props.removeCategoryInFilter(category.id)
              }}
            />
            <label htmlFor={formatString(category.name)}>{category.name}</label>
            <div className={`${styles["icon-checkbox"]}`} />
          </div>
        )
      })}
      
      <hr />

      <h5 className="my-4">Preço</h5>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        <Range
          values={initialPosition}
          min={0}
          max={299.99}
          onChange={(initialPosition) => {
            setInitialPosition(initialPosition);
          }}
          onFinalChange={(initialPosition) => {
            props.handlePriceRange(initialPosition);
          }}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: '36px',
                display: 'flex',
                width: '100%'
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: '3px',
                  width: '100%',
                  background: getTrackBackground({
                    values: initialPosition,
                    colors: ['#E5E5E5', '#2C3238', '#E5E5E5'],
                    min: 0,
                    max: 299.99
                  })
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '16px',
                width: '16px',
                border: '4px solid #2C3238',
                borderRadius: '50%',
                backgroundColor: '#FFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            />
          )}
        />
        <output style={{ color: '#D4D4D4', marginBottom: '24px' }} id="output">
          R$ {initialPosition[0].toFixed(2)} - R$ {initialPosition[1].toFixed(2)}
        </output>
      </div>

      <hr />

      <h5 className="my-4">Cores</h5>
      <div className={`mb-2 ${styles.colors}`}>
        {props.colors.map(color => {
          const colorStyle = {
            backgroundColor: color.hex_code
          }

          return (
            <div className={`${styles.color} mr-1 mb-2`} key={color.id}>
              <input
                type="checkbox"
                name={`color-${color.name.toLowerCase()}`}
                id={`color-${color.name.toLowerCase()}`}
                onChange={(event) => {
                  event.currentTarget.checked ? props.addColorInFilter(color.id)
                                              : props.removeColorInFilter(color.id)
                }}
              />
              <label htmlFor={`color-${color.name.toLowerCase()}`} style={colorStyle} />
            </div>
          );
        })}
      </div>

      <hr />
    </div>
  );
}