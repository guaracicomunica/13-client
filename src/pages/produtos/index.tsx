import { useState, useEffect, useContext } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';

import { getAPIClient } from '../../services/apiClient';

import Carousel from '../../components/Carousel';
import { Filter } from '../../components/Filter';
import { ProductCard } from '../../components/ProductCard';
import WhatsappIcon from '../../components/WhatsappIcon';

import { LoadingContext } from '../../contexts/LoadingContext';

import { FilterItemType, FilterType, } from '../../types/filter/index'
import { ProductType, ProdutosPageProps } from '../../types/products/index';

import styles from './styles.module.css';

export default function Produtos(props: ProdutosPageProps) {
  const api = getAPIClient();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [brands, setBrands] = useState<FilterItemType[]>([]);
  const [sizes, setSizes] = useState<FilterItemType[]>([]);
  const [categories, setCategories] = useState<FilterItemType[]>([]);
  const [materials, setMaterials] = useState<FilterItemType[]>([]);
  const [firstProductOnPage, setFirstProductOnPage] = useState(0);
  const [lastProductOnPage, setLastProductOnPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const { loading, setLoading } = useContext(LoadingContext);

  const [ filter, setFilter ] = useState<FilterType>({
    brandId: "0",
    sizeId: "0",
    categoryId: "0",
    priceMin: 0,
    priceMax: 299.99,
    materialId: "0"
  });

  const [ categoryFilter, setCategoryFilter ] = useState<number[]>([])

  useEffect(() => {
    setTimeout(() => setLoading(props.isLoading), 4500);
  }, [loading]);

  useEffect(() => {
    if (props) {
      setProducts(props.products);
      setBrands(props.brands);
      setSizes(props.sizes);
      setCategories(props.categories);
      setMaterials(props.materials);
      setFirstProductOnPage(props.queryProps.firstProductOnPage);
      setLastProductOnPage(props.queryProps.lastProductOnPage);
      setTotalPages(props.queryProps.totalPages);
      setTotalProducts(props.queryProps.totalProducts);
    }
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filter]);

  async function changePage(page) {
    setLoading(true);

    const { data } = await api.get('products', {
      params: {
        per_page: 9,
        page: page.selected + 1
      }
    });

    const products: ProductType[] = data.data.map(product => {
      return {
        id: product.id,
        title: product.name,
        price: product.price
      }
    });

    setProducts(products);
    setFirstProductOnPage(data.from);
    setLastProductOnPage(data.to);

    setLoading(false);
  }

  function openFilter() {
    document.querySelector('#filter')?.classList.toggle("show-filter");
  }

  function addCategoryInFilter(item: number) {
    const categoriesFiltered = [...categoryFilter, item];

    setCategoryFilter(categoriesFiltered);
    
    setFilter({
      ...filter,
      categoryId: categoriesFiltered.toString()
    });
  }

  function removeCategoryInFilter(item: number) {
    const categoriesFiltered = categoryFilter.filter(
      category => category !== item
    );

    setCategoryFilter(categoriesFiltered);

    const categoryFilterIsEmpty = categoriesFiltered.length === 0;

    setFilter({
      ...filter,
      categoryId: categoryFilterIsEmpty ? "0" : categoriesFiltered.toString()
    });
  }

  function handlePriceRange(values: number[]) {
    setFilter({
      ...filter,
      priceMin: values[0],
      priceMax: values[1]
    })
  }

  function handleFilter(nameFilter: string, valueFilter: string) {
    setFilter({
      ...filter,
      [nameFilter]: valueFilter
    });
  }

  async function filterProducts() {
    setLoading(true);

    const { data } = await api.get('products', {
      params: {
        per_page: 9,
        ...filter
      }
    });

    const products: ProductType[] = data.data.map(product => {
      return {
        id: product.id,
        title: product.name,
        price: product.price
      }
    });

    setProducts(products);
    setFirstProductOnPage(data.from);
    setLastProductOnPage(data.to);
    setTotalPages(data.last_page);
    setTotalProducts(data.total);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Geral.com | Produtos por departamento</title>
      </Head>
      
      <main className="background-gray">
        <Carousel isLoading={loading} />

        <section className="section d-none d-md-flex flex-column">
          <div className="row justify-content-between">
            <div className="col-12 col-md-6 col-lg-4 mb-3 mb-lg-0">
              <div className="d-flex justify-content-lg-center align-item-center">
                <img src="/icons/wallet-green.svg" className="mr-2 icon-section" alt="Icon" />
                <span className="align-middle">Aceitamos <b>cartão, PIX e boleto</b></span>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-3 mb-lg-0">
              <div className="d-flex justify-content-lg-center align-item-center">
                <img src="/icons/truck-green.svg" className="mr-2 icon-section" alt="Icon" />
                <span className="align-middle">Entregamos para <b>todo o Brasil</b></span>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="d-flex justify-content-lg-center align-item-center">
                <img src="/icons/security-green.svg" className="mr-2 icon-section" alt="Icon" />
                <span className="align-middle">Compre com <b> segurança</b> no cartão</span>
              </div>
            </div>
          </div>
        </section>

        <div className={`${styles["filter-bar"]} d-flex d-md-none w-100`}>
          <button className={styles["filter-collapse"]} onClick={openFilter}>
            <img src="/icons/filter.svg" alt="Filtro" />
          </button>
        </div>
        
        <section className="section align-items-center py-0">
          <nav aria-label="breadcrumb" className="d-none d-md-flex">
            <ol className="breadcrumb px-0">
              <li className="breadcrumb-item">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">Masculino</li>
            </ol>
          </nav>

          <div className="d-none d-md-flex justify-content-between">
            <span className="text-gray">
              Exibindo {firstProductOnPage} - {lastProductOnPage} de {totalProducts} resultados
            </span>

            <div className={`d-flex align-items-center ${styles["order-filter"]}`}>
              <label htmlFor="order">Ordenar por</label>
              <select name="order" id="order" className="form-control ml-4">
                <option value="popular">Mais populares</option>
                <option value="recent">Mais recentes</option>
                <option value="lowest-price">Menor preço</option>
                <option value="biggest-price">Maior preço</option>
              </select>
            </div>
          </div>
        </section>
        
        <section className={`section ${styles["products-filter"]}`}>
          <Filter
            brands={brands}
            sizes={sizes}
            categories={categories}
            materials={materials}

            handleFilter={handleFilter}
            handlePriceRange={handlePriceRange}
            addCategoryInFilter={addCategoryInFilter}
            removeCategoryInFilter={removeCategoryInFilter}
          />          

          <div className={styles["products-list"]}>
            {loading === false && products.length === 0 ? (
              <div className={styles["products-not-found"]}>
                Nenhum produto encontrado.
              </div>
            ) : (
              products.map(product => {
                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    favorite={true}
                    img="camisa-barcelona"
                    isLoading={loading}
                  />
                )
              })
            )}
          </div>
        </section>

        <section className="section mt-5 mt-md-0">
          <ReactPaginate
            onPageChange={changePage}
            pageCount={totalPages}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            previousLabel="Anterior"
            nextLabel="Próximo"
            breakLabel="..."

            containerClassName="pagination justify-content-center align-items-center"
            pageClassName="page-item mr-3"
            pageLinkClassName={`${styles["link-pagination"]} page-link`}
            activeLinkClassName={`${styles["active-link-pagination"]}`}
            previousClassName="page-item"
            previousLinkClassName={`${styles["next-link-pagination"]} mr-3 page-link`}
            nextClassName="page-item"
            nextLinkClassName={`${styles["next-link-pagination"]} page-link`}
            breakLinkClassName={`${styles["break-link-pagination"]} mr-3`}
          />
        </section>
      
        <WhatsappIcon
          phone={process.env.NEXT_PUBLIC_CONTACT_PHONE}
          message="Olá, vim do site do Geral. Gostaria de entrar em contato com a equipe de vocês aqui mesmo pelo Whatsapp."
        />
      </main>
    </>
  );
}

function mapResponse(response: any) {
  return response.data?.map(item => {
    return {
      id: item.id,
      name: item.name
    }
  });
}

export const getStaticProps: GetStaticProps = async () => {
  const api = getAPIClient();

  const { data } = await api.get('products', {
    params: {
      per_page: 9
    }
  });

  const products: ProductType[] = data.data.map(product => {
    return {
      id: product.id,
      title: product.name,
      price: product.price
    }
  });

  const dataBrands = await api.get('brands');
  const brands: FilterItemType[] = mapResponse(dataBrands);

  const dataSizes = await api.get('sizes');
  const sizes: FilterItemType[] = mapResponse(dataSizes);

  const dataCategories = await api.get('categories');
  const categories: FilterItemType[] = mapResponse(dataCategories);

  const dataMaterials = await api.get('materials');
  const materials: FilterItemType[] = mapResponse(dataMaterials);

  return {
    props: {
      products,
      brands,
      sizes,
      categories,
      materials,
      queryProps: {
        totalProducts: data.total,
        totalPages: data.last_page,
        firstProductOnPage: data.from,
        lastProductOnPage: data.to
      },
      isLoading: false
    },
    revalidate: 60 * 60 * 24
  }
}
