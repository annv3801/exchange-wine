
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { NextSeo } from 'next-seo';
import { sortByDate ,ImageUrl} from '../utils'
import {useEffect, useState} from "react";
import axios from "axios";
import ProductCarousel from "../components/ProductCarousel";
import {Carousel} from "antd";

export default function Home({ posts }) {
    const [slider, setSlider] = useState([]);
    const [products, setProducts] = useState([]);
    const [news, setNews] = useState([]);
    const [brand, setBrand] = useState([]);
    useEffect(() => {
        axios.post('https://api.thumuaruouhn.online/Slide/View-List-Slides', {
                pageSize: 10,
                currentPage: 1,
                searchByFields: [],
                sortByFields: [],
            },
            {
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                const listSlider = res.data?.data.data;
                setSlider(listSlider);
            })
            .catch((error) => {
                console.error(`There was an error retrieving the data: ${error}`);
            });
    }, []);

    useEffect(() => {
        axios.post('https://api.thumuaruouhn.online/LiquorExchange/Product/Get-List-Products-Best-Selling', {
                pageSize: 10,
                currentPage: 1,
                searchByFields: [],
                sortByFields: [],
            },
            {
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                const listSlider = res.data?.data.data;
                setProducts(listSlider);
            })
            .catch((error) => {
                console.error(`There was an error retrieving the data: ${error}`);
            });
    }, []);

    useEffect(() => {
        axios.post('https://api.thumuaruouhn.online/LiquorExchange/News/Get-List-News', {
                pageSize: 4,
                currentPage: 1,
                searchByFields: [],
                sortByFields: [],
            },
            {
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                const listSlider = res.data?.data.data;
                setNews(listSlider);
            })
            .catch((error) => {
                console.error(`There was an error retrieving the data: ${error}`);
            });
    }, []);

    useEffect(() => {
        axios.post('https://api.thumuaruouhn.online/LiquorExchange/Brand/Get-List-Brands', {
                pageSize: 99,
                currentPage: 1,
                searchByFields: [],
                sortByFields: [],
            },
            {
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                const listSlider = res.data?.data.data;
                setBrand(listSlider);
            })
            .catch((error) => {
                console.error(`There was an error retrieving the data: ${error}`);
            });
    }, []);

  return (
    <div>
      <NextSeo
        title="RƯỢU DUTY SÂN BAY | TRANG CHỦ"
        description="RƯỢU DUTY SÂN BAY"
        openGraph={{
          url: 'https://thumuaruouhn.online',
          title: 'RƯỢU DUTY SÂN BAY | TRANG CHỦ',
          description: 'RƯỢU DUTY SÂN BAY',
          images: [
            {
              url: `${ImageUrl('Resources/d9653e9c-a9d3-4b51-95eb-690c682f17d0.jpg')}`,
              width: 1224,
              height: 724,
              alt: 'banner',
              type: 'image/jpeg',
            },
          ],
          site_name: 'RƯỢU DUTY SÂN BAY',
        }}      
      />
        <Carousel autoplay>
            {slider.map((s) => {
                const isMobile = window.innerWidth <= 768; // or whatever breakpoint you want to use for mobile devices
                const height = isMobile ? 500 : 700;
                const width = isMobile ? 850 : 1920;
                return (
                    <img src={`https://api.thumuaruouhn.online/Uploads/${s.image}?height=${height}&width=${width}`} className="lg:h-full object-cover" alt={s.name} key={s.id}/>
                );
            })}
        </Carousel>
        <div className="relative bg-[#edf0f3]">
            <div className="py-3 md:py-5 container mx-auto px-3 md:px-0 z-10 relative">
                <div className="heading text-center">
                    <h1 className="py-4 md:py-5 text-xl md:text-3xl font-bold uppercase text-yellow-600 inline-block relative bg-[#edf0f3] px-5 md:px-10 z-10">Rượu Duty sân bay</h1>
                </div>
                <div className="text-center mx-5 pb-5">Shop Rượu – là đơn vị chuyên cung cấp rượu ngoại chính hãng, giá tốt tại Hà Nội. Được thành lập từ năm 1999, với hơn 20 năm kinh nghiệm chúng tôi luôn tự hào mang đến cho khách hàng từ trải nghiệm mua sắm đến chất lượng sản phẩm bậc nhất!</div>
            </div>
        </div>
        <div className="relative">
            <div className="py-3 md:py-5 container mx-auto px-3 md:px-0 z-10 relative">
                <div className="heading text-center">
                    <h1 className="py-4 md:py-5 text-xl md:text-3xl font-bold uppercase text-yellow-600 inline-block relative bg-white px-5 md:px-10 z-10">Sản phẩm bán chạy</h1>
                </div>
                <ProductCarousel products={products}></ProductCarousel>
            </div>
        </div>
        <div className="bg-[#edf0f3] relative">
            <div className="py-3 md:py-5 container mx-auto px-4 md:px-0">
                <div className="heading text-center">
                    <h1 className="py-4 md:py-5 text-xl md:text-3xl font-bold uppercase text-yellow-600 inline-block relative bg-[#edf0f3] px-5 md:px-10">Tin Tức</h1>
                </div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4">
                    {news.map((news) => {
                        let createdTime = news.createdTime; // "21-04-2024 15:47:49"
                        let date = new Date(createdTime.split(" ")[0].split("-").reverse().join("-") + "T" + createdTime.split(" ")[1]);

                        // Manually format the date and time
                        let formattedDate = ("0" + date.getDate()).slice(-2) + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear() + ' ' + ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2);

                        return (
                            <a href={`/tin-tuc/${news.slug}`} className="bg-white px-2 py-2 md:px-3 md:py-3 flex flex-col rounded-xl hover:border-blue-500 hover:text-blue-500 duration-200 ease-in-out">
                                <img className="rounded-xl" src={`https://api.thumuaruouhn.online/Uploads/${news.image}?height=300&width=500`} alt=""/>
                                <h1 className="mt-3 text-base lg:text-lg font-bold text-center line-clamp-2">{news.name}</h1>
                                <div className="my-2 text-center text-sm text-gray-500">{formattedDate}</div>
                            </a>
                        );
                    })}
                </div>
                <div className="py-5 text-center">
                    <a href="" className="underline">Xem tất cả</a>
                </div>
            </div>
        </div>
        <div className="mx-auto container py-5 px-3">
            <div className="heading text-center">
                <h1 className="py-4 md:pt-5 text-xl md:text-3xl font-bold uppercase text-yellow-600 inline-block relative bg-white px-5 md:px-10">Thương hiệu</h1>
            </div>
            <div className="grid grid-cols-2 gap-2 md:gap-3 md:grid-cols-5 lg:grid-cols-6 lg:gap-5 pt-5">
                {brand.map((s) => (
                    <a href={`/category/${s.category.slug}`} key={s.name} className="border-2 border-blue-400 rounded-lg items-center flex justify-center">
                        <img src={`https://api.thumuaruouhn.online/Uploads/${s.image}?height=100`}
                             alt={s}
                             style={{
                                 minWidth: '141px',
                                 maxWidth: '145px',
                                 minHeight: '77.83px',
                                 maxHeight: '106.03px',
                                 objectFit: 'contain'
                             }}
                             className="mx-auto py-3"/>
                    </a>
                ))}
            </div>
        </div>
    </div>
  )
}

export async function getStaticProps() {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join('posts'))

  // Get slug and frontmatter from posts
  const tempPosts = files.map((filename) => {
    // Create slug
    const slug = filename.replace('.md', '')

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )

    const { data: frontmatter } = matter(markdownWithMeta)


    if (frontmatter.draft === false) {
      return {
        slug,
        frontmatter,
      }
    } else {
      return null
    }

  })

  //  remove null in tempPosts 
  const posts = tempPosts.filter(
    post => {
      return post && post
    }
  )
  const jsonString = JSON.stringify(posts)
  fs.writeFileSync('./search.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  }


}


 
