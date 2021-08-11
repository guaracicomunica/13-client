import { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

import { FilterItemType } from '../../types/products/index';

import { formatString } from '../../utils/formatString';

import styles from './styles.module.css';

type FilterProps = {
  brands: FilterItemType[];
  sizes: FilterItemType[];
  categories: FilterItemType[];
  handleFilter: (nameFilter: string, valueFilter: string) => void;
  handlePriceRange: (values: number[]) => void;
  addCategoryInFilter: (item: number) => void;
  removeCategoryInFilter: (item: number) => void;
}

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
      >
        <option value="" disabled={true}>Material</option>
        <option value="all">Todos os materiais</option>
        <option value="algodao">Algodão</option>
        <option value="poliester">Poliéster</option>
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
        <div className={`${styles.color} mr-3 mb-2`}>
          <input type="checkbox" name="color-black" id="color-black" />
          <label htmlFor="color-black" />
        </div>

        <div className={`${styles.color} mr-3 mb-2`}>
          <input type="checkbox" name="color-white" id="color-white" />
          <label htmlFor="color-white" />
        </div>

        <div className={`${styles.color} mr-3 mb-2`}>
          <input type="checkbox" name="color-gray" id="color-gray" />
          <label htmlFor="color-gray" />
        </div>

        <div className={`${styles.color} mr-3 mb-2`}>
          <input type="checkbox" name="color-red" id="color-red" />
          <label htmlFor="color-red" />
        </div>

        <div className={`${styles.color} mr-3 mb-2`}>
          <input type="checkbox" name="color-blue" id="color-blue" />
          <label htmlFor="color-blue" />
        </div>

        <div className={`${styles.color} mr-3 mb-2`}>
          <input type="checkbox" name="color-green" id="color-green" />
          <label htmlFor="color-green" />
        </div>

        <div className={`${styles.color} mr-3 mb-2`}>
          <input type="checkbox" name="color-yellow" id="color-yellow" />
          <label htmlFor="color-yellow" />
        </div>

        <div className={`${styles.color} mr-3 mb-2`}>
          <input type="checkbox" name="color-purple" id="color-purple" />
          <label htmlFor="color-purple" />
        </div>

        <div className={`${styles.color} mr-3 mb-2`}>
          <input type="checkbox" name="color-brown" id="color-brown" />
          <label htmlFor="color-brown" />
        </div>
      </div>

      <hr />
    </div>
  );
}