const loadPhone = async (searchText='13',isShowAll) => {
        const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
        const data = await res.json();
        // console.log(data.data);
        displayPhones(data.data, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
        // 1. connect by id
        const phoneContainer = document.getElementById('phone-container');
        // clear phone container card before adding new cards
        phoneContainer.textContent ='';
        // display show all button
        const showAllButton = document.getElementById('show-all-container');
        if(phones.length > 12 && !isShowAll){
                showAllButton.classList.remove('hidden');
        }
        else{
                showAllButton.classList.add('hidden');
        }
        // console.log("is show all",isShowAll);
        // display only first 12 phone if not show all
        if(!isShowAll){
                phones = phones.slice(0,12);
        }
        // console.log(phones);
        phones.forEach(phone => {
                // console.log(phone);
                //2. create a div
                const phoneCard = document.createElement('div');
                phoneCard.classList = `card bg-gray w-96 shadow-xl my-10 p-10 border-2 border-[#CFCFCF]`;
                // 3. set innner HTML
                phoneCard.innerHTML = `
        <figure class="pt-10 bg-sky-100 pb-10">
        <img src="${phone.image}" alt="" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions">
                        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                </div>
        </div>
        `;
        // 4.append Child
        phoneContainer.appendChild(phoneCard); 
        });
        // hide loading spinner
        toggleLoadingSpinner(false);
}
// handle show details
const handleShowDetails = async (id) =>{
        // console.log("Details",id);
        // load single phone data
        const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
        const data = await res.json();
        // console.log(data);
        showPhoneDetails(data.data);

}
// handle show details about phone
const showPhoneDetails = (phone) =>{
         console.log(phone);
        show_details_modal.showModal()
        const phoneName = document.getElementById('phone-name');
        phoneName.innerHTML = `
        <figure class="pt-10 bg-sky-100 pb-2 flex justify-center">
        <img src="${phone.image}" alt="" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.name}</h2>
                <h4 class="card-title">Chip-set:${phone.mainFeatures.chipSet}</h4>
                <p>Storage:${phone.mainFeatures.storage}</p>
                <p>Display:${phone.mainFeatures.displaySize}</p>
                <p>Sensors::${phone.mainFeatures.sensors}</p>
        </div>
        `;
}

// handle search button
const handleSearch = (isShowAll) =>{
        toggleLoadingSpinner(true);
        const searchFiled = document.getElementById('search-filed');
        const searchText = searchFiled.value;
        console.log(searchText);
        loadPhone(searchText,isShowAll);
}

// loading 
const toggleLoadingSpinner = (isLoading) =>{
        const loadingSpinner = document.getElementById('loading-spiner');
        if(isLoading){
                loadingSpinner.classList.remove('hidden');
        }
        else{
                loadingSpinner.classList.add('hidden');
        }
}
// handle show all
const handleShowAll = () =>{
        handleSearch(true);
}

 loadPhone()