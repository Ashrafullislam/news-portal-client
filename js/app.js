const loadNews = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayNews(data.data.news_category))
}
const displayNews = items => {
   const menuItems = document.getElementById('menu-item');
    items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
        <a 
        style="cursor: pointer;"
        class="nav-link active py-2 px-4 fs-5" 
        aria-current="page" 
        onclick='displaySection(${item.category_id})'>
        ${item.category_name}
        </a>
        `;
        menuItems.appendChild(li)
    })
}

const displaySection = async(cat) =>{
    displayLoading(true);
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/0${cat}`)
    const data = await res.json()
    showCategory(data.data)
    displayLoading(false);
}

// snipper section 
const displayLoading = isLoading => {
    const loading = document.getElementById('loading');
    if(isLoading){
        loading.classList.remove('d-none');
    }
    else{
        loading.classList.add('d-none');
    }
}

const showCategory = (sections) => {
    // show the length 
    const elem = document.getElementById('newsItems');
    const text = sections.length > 0 ? `${sections.length} News Found Of This Category`: "Nothing Found";
    elem.innerText = text;
    const sectionCard = document.getElementById('section-card')
    sectionCard.innerHTML = '';
    sections.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.classList.add('col')
        sectionDiv.innerHTML =`
        <div class="col-lg-3 col-12" id="card-img-div">
        <img id="card-img" src="${section.thumbnail_url}" class=" rounded-start" alt="...">
      </div>

      <div class="col-lg-9 col-12">
        <div class="card-body">
          <h5 class="card-title mb-3">${section.title}</h5>
          <p class="card-text">${section.details.slice(0, 400)+ '...'}</p>
        </div>

        <div class="col-lg-12 col-md-12 col-sm-12 card-bottom d-flex justify-content-between    align-items-center ">
            <div class="men-info d-flex align-items-center ">
                <div class="author-img ">
                    <img class="men-info-img" src="${section.author.img}" alt="">
                </div>
               <div class="men-title ms-3 ">
                    <p class="mb-0">${section.author.name}</p>
                    <p class="mb-0">${section.author.published_date}</p>
               </div> 
            </div>

            <div class="view-item d-flex align-items-center ">
            <i class="fa-regular fa-eye fs-3 me-2"></i>
            <p class="mb-0 fs-5">${section.total_view ? section.total_view : '0'}</p>
        </div>

            
            <button 
            onclick="newsDetails('${section._id}')"
            class="btn fs-4 text-primary"
            type="button" 
            data-bs-toggle="modal" 
            data-bs-target="#staticBackdrop">
                <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>
      </div>
        `;
        sectionCard.appendChild(sectionDiv)
    })   
}

const newsDetails = id => {
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then(res => res.json())
    .then(data => showSingleNews(data.data))
}

const showSingleNews = news => {
    console.log(news[0]);
    const mainDiv = document.getElementById('my-modal');
    mainDiv.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('modal-content')
    div.innerHTML = `
        <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
                ${news[0].title}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <img class="img-thumbnail" src="${news[0].image_url}">
            <div class="d-flex justify-content-between my-2 align-items-center">
                <div class="men-info d-flex align-items-center">
                    <img class="men-info-img" src="${news[0].author.img}" alt="">
                <div class="men-title ms-2">
                        <p class="mb-0">Author</p>
                        <p class="mb-0">${news[0].author.name}</p>
                </div> 
                </div>
                <div class="view-item d-flex align-items-center">
                        <i class="fa-regular fa-eye fs-3 me-2"></i>
                        <p class="mb-0 fs-5">${news[0].total_view}</p>
                </div>
            </div>
            <div>
                <p>
                ${news[0].details}
                </P>
            </div>
        </div>
    `;
    mainDiv.appendChild(div);
}

// call the function 
loadNews();
displaySection(8);
