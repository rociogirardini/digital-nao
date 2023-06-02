let isLoading = false;
let page = 1;
let items = "";
let lastItem;
let observer = new IntersectionObserver(
  (entrys) => {
    entrys.forEach((entry) => {
      if (entry.isIntersecting && !isLoading) {
        page++;
        showLoadingIndicator(); 
        setTimeout(() => {
          loadContent();
        }, 1000); // Simula más tiempo de carga para que se vea el efecto
      }
    });
  },
  {
    rootMargin: "0px 0px 20px 0px",
    threshold: 1.0,
  }
);

const loadContent = async () => {
  isLoading = true;

  try {
    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products?offset=${page}&limit=10`
    );
    if (response.status === 200) {
      const data = await response.json();
      data.forEach((item) => {
        items += `
        <div class="card item text-bg-secondary mb-2">
        <img class="card-img-top poster" src="${item.images[0]}"
        <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">${item.description}</p>
        </div>
        `;
      });

      document.getElementById("content").innerHTML = items;

      if(lastItem){
        observer.unobserve(lastItem)
      };

      const itemsOnScreen = document.querySelectorAll("#content .item");
      lastItem = itemsOnScreen[itemsOnScreen.length - 1];

      observer.observe(lastItem);
    }
  } catch (error) {
    console.log(error);
  }

  isLoading = false;
};

function showLoadingIndicator() {
  let loadingIndicator = document.getElementById("loading-indicator");
  loadingIndicator.style.display = "block";
}

// Cargar el contenido por primera vez
loadContent();
