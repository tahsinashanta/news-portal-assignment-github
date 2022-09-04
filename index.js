
// step-1: load news categories
const loadCategory = async () => {
  try {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    const res = await fetch(url)
    const data = await res.json()
    return (data.data.news_category);
  }
  catch (error) {
    alert("Something has gone wrong, please check the url")
  }
}

//step-2: display news categories

const displayCategory = async () => {
  const categories = await loadCategory();
  console.log(categories)

  const newsCategoryContainer = document.getElementById('news-category-container');

  categories.forEach(category => {
    console.log(category)

    const { category_name, category_id } = category;

    const newLi = document.createElement('li');
    newLi.classList.add('li')

    newLi.innerHTML = `
        <button class="btn btn-outline-secondary " id="category-names" onclick="loadCategoryDetails('${category_id}')"> ${category_name} </button>
        `
    newsCategoryContainer.appendChild(newLi);
  })
}

//step-3: load category details
const loadCategoryDetails = async (id) => {
  console.log(id)
  
  try{
  const spinner = document.getElementById('spinner').classList.remove('d-none');
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`
  const res = await fetch(url)
  const data = await res.json()
  console.log(data)
  displayCategoryDetails(data.data);
  }
  catch (error){
    alert("Something has gone wrong, please check the url")
  }
}

//step-4: display category details
const displayCategoryDetails = async (news) => {
  console.log(news)
  
  // news sorting
  news.sort((a, b) => {
    return b.total_view - a.total_view;
  });

  const spinner = document.getElementById('spinner').classList.add('d-none')
  const itemsFound = document.getElementById('items-found');
  itemsFound.classList.add('news-found')
  itemsFound.textContent = "";


//error-message
  if (news.length !== 0) {
    itemsFound.innerHTML = `${news.length} items found as per your search`
    document.getElementById('no-items-found').classList.add('d-none')
  }

  else {
    document.getElementById('no-items-found').classList.remove('d-none');
    itemsFound.classList.remove('news-found')
  }

  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = "";

//news card
  news.forEach(singleNews => {
    // console.log(singleNews)
    const { author, title, total_view, thumbnail_url, details, others_info, _id, rating } = singleNews;
    const { name, published_date, img } = author;
    // console.log(details)

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card')
    cardDiv.innerHTML = `
    <div class="row g-0 d-flex justify-content-center align-items-center">
    <div class="col-md-4">
      <img src="${thumbnail_url ? thumbnail_url : 'No Image Found'}" class=" w-100 h-100 img-fluid rounded-start ps-4 py-4" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body p-5">
        <h5 class="card-title fw-bold fs-3">${title ? title : "No Title Found"}</h5>
        <p class="card-text text-muted">${details ? details.slice(0, 300) + "..." : "No Details Found"}</p>
       
        <div class="d-flex justify-content-between align-items-center mt-5 ">     

        <div class="d-flex align-items-center justify-content-evenly"> 
        <div> <img style="width: 50px; border-radius: 50%; margin-right: 15px;" src ="${img}" </img> </div>
        <div class="d-flex flex-column me-2">
        <p>${name ? name : "Anonymous"}</p>
        <p class="text-muted">${published_date ? published_date : "No date found"}</p>
        </div>
        </div>

        <div class="d-flex align-items-center justify-content-center" style="width: 150px;"> 
        <img style= "width: 15%; opacity: 70%;" src="/view.png" alt=""> 
        <p class="pt-3 ps-2 text-secondary fw-bold"> ${total_view === null ? "Not available" : total_view}</p>
        </div>

        <div>
        <i class="fa-solid fa-star-half-stroke"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        </div>

        <div>
        <button onclick="loadNewsData('${_id}')" type="button" 
        class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
        </div>

        </div> 
      </div>
    </div>
  </div>
    `
    cardContainer.appendChild(cardDiv)
  }
  )
}


// modal section
const loadNewsData = async (id) => {
  // console.log(id)
  try {
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayNewsDetails(data.data[0])
  }
  catch (error) {
    alert("Something has gone wrong, please check the url")
  }

}

// display modal section
const displayNewsDetails = async (newsDetails) => {
  // console.log(newsDetails)

  const { title, thumbnail_url, rating, details, total_view, author } = newsDetails;
  const { name } = author;
  const { number, badge } = rating;

  const newsModalContainer = document.getElementById('news-modal-container');
  newsModalContainer.innerHTML = `
<h6 class="text-center">${title ? title : "No Title Found"} </h6>
<div class="d-flex">
<img class="img-fluid w-50" src = "${thumbnail_url ? thumbnail_url : "No image found"}" </img>
<p style="font-size: 8px;" class="card-text text-muted pt-3 ps-3">${details ? details.slice(0, 300) + "..." : "No Details Found"}</p>
</div>

<div class="fw-bold mt-5 text-center">
<p> Written By: ${name === null ? 'No writer information found' : name} </p>
<p> Total View: ${total_view === null ? "No viewer information found" : total_view} </p>
</div>

<div class= "d-flex justify-content-evenly py-3 fw-bold fs-6">
<p> Rating: ${number ? number : "No rating found"} </p>
<p> Badge: ${badge ? badge : "No comment found"} </p>
</div>
`
}
// blog modal
const showModal = () => {
  const blogModalContainer = document.getElementById('blog-modal-container');
}

loadCategory();
displayCategory();
