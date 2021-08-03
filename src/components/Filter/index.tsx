import { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

import styles from './styles.module.css'

export function Filter() {
  const [initialPosition, setInitialPosition] = useState([25,200]);

  return (
    <div
      className={`${styles.filter}`}
      id="filter"
    >
      <select defaultValue="" name="size" id="size" className="form-control mb-3">
        <option value="" disabled={true}>Tamanho</option>
        <option value="all">Todos os tamanhos</option>
        <option value="pp">PP</option>
        <option value="p">P</option>
        <option value="m">M</option>
        <option value="g">G</option>
        <option value="gg">GG</option>
      </select>

      <select defaultValue="" name="brand" id="brand" className="form-control mb-3">
        <option value="" disabled={true}>Marca</option>
        <option value="all">Todas as marcas</option>
        <option value="nike">Nike</option>
        <option value="adidas">Adidas</option>
      </select>

      <select defaultValue="" name="type-product" id="type-product" className="form-control mb-3">
        <option value="" disabled={true}>Tipo de produto</option>
        <option value="all">Todos os tipos de produto</option>
        <option value="camisa">Camisa</option>
      </select>

      <select defaultValue="" name="material" id="material" className="form-control mb-3">
        <option value="" disabled={true}>Material</option>
        <option value="all">Todos os materiais</option>
        <option value="algodao">Algodão</option>
        <option value="poliester">Poliéster</option>
      </select>

      <select defaultValue="" name="rating" id="rating" className="form-control mb-3">
        <option value="" disabled={true}>Avaliações</option>
        <option value="all">Todas as avaliações</option>
        <option value="five">Cinco estrelas</option>
        <option value="four">Quatro estrelas</option>
        <option value="three">Três estrelas</option>
        <option value="two">Duas estrelas</option>
        <option value="one">Uma estrela</option>
      </select>

      <div className={`${styles["filter-checkbox"]} mb-3`}>
        <input
          type="checkbox"
          name="selecao-tailandesa"
          id="selecao-tailandesa"
        />
        <label htmlFor="selecao-tailandesa">Seleções tailandesas</label>
        <div className={`${styles["icon-checkbox"]}`} />
      </div>

      <div className={`${styles["filter-checkbox"]} mb-3`}>
        <input
          type="checkbox"
          name="selecao-europeia"
          id="selecao-europeia"
        />
        <label htmlFor="selecao-europeia">Seleções europeias</label>
        <div className={`${styles["icon-checkbox"]}`} />
      </div>

      <div className={`${styles["filter-checkbox"]} mb-4`}>
        <input
          type="checkbox"
          name="selecao-brasileira"
          id="selecao-brasileira"
        />
        <label htmlFor="selecao-brasileira">Seleções brasileiras</label>
        <div className={`${styles["icon-checkbox"]}`} />
      </div>
      
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
          min={19.99}
          max={599.99}
          onChange={(initialPosition) => {
            setInitialPosition(initialPosition);
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
                    min: 19.99,
                    max: 599.99
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