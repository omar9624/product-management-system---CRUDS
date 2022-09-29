let title = document.getElementById('title');
let price = document.getElementById('price');
let texas = document.getElementById('texas');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
var total = document.getElementById('total');
let delDiv = document.getElementById('del-btn');
var isCreate = true;
var updateIndex = 0;

let search = document.getElementById('search');
let btnTitle = document.getElementById('btn-title');
let btnCategory = document.getElementById('btn-category');
let table = document.getElementById('table');
let tBody = document.getElementById('table-body');

let submit = document.getElementById('submit');

var items = [];

function showData()
{
    for(let i = 0 ; i < items.length ; i++)
    {
         //create row in table
         var tr = document.createElement('tr');
         tr.className = 'table-row';
         var id = document.createElement('td');
         id.innerHTML = i + 1;
         var tit = document.createElement('td');
         tit.innerHTML = items[i]['title'];
         var pr = document.createElement('td');
         pr.innerHTML = items[i]['price'];
         var tex = document.createElement('td');
         tex.innerHTML = items[i]['texas'];
         var ad = document.createElement('td');
         ad.innerHTML = items[i]['ads'];
         var disc = document.createElement('td');
         disc.innerHTML = items[i]['discount'];
         var tot = document.createElement('td');
         tot.innerHTML = items[i]['total'];
         var cat = document.createElement('td');
         cat.innerHTML = items[i]['category'];
 
         var updateBtn = document.createElement('button');
         updateBtn.innerHTML = 'Update';
         updateBtn.className = 'update';
         updateBtn.classList.add("rounded-3" , "small" , "ps-3" , "pe-3" , "pt-2" , "pb-2");
         var btnUp = document.createElement('td')
         btnUp.appendChild(updateBtn);
 
         var deleteBtn = document.createElement('button');
         deleteBtn.innerHTML = 'Delete';
         deleteBtn.className = 'delete';
         deleteBtn.classList.add("rounded-3" , "small" , "ps-3" , "pe-3" , "pt-2" , "pb-2");
         var btnDel = document.createElement('td');
         btnDel.appendChild(deleteBtn);
 
         tr.appendChild(id);
         tr.appendChild(tit);
         tr.appendChild(pr);
         tr.appendChild(tex);
         tr.appendChild(ad);
         tr.appendChild(disc);
         tr.appendChild(tot);
         tr.appendChild(cat);
         tr.appendChild(btnUp);
         tr.appendChild(btnDel);
 
         tBody.appendChild(tr);
         delDiv.innerHTML = `<Button class="btn btn-del p-2 w-100" id="btn-del">Delete All {${items.length}}</Button>`;
        //  console.log(items.length);
    }
}

//fetch data from localstorage and show in page
function fetchDataFromLocalStorage()
{
    if(localStorage.getItem("items") != null)
    {
        items = JSON.parse(localStorage.getItem("items"));
        var storedItems = JSON.parse(localStorage.getItem("items"));

        if(storedItems.length != 0)
        {
            for(var i = 0 ; i < storedItems.length ; i++)
            {
                var tr = document.createElement('tr');
                tr.className = 'table-row';
                var id = document.createElement('td');
                id.innerHTML = `${i + 1}`;
                var tit = document.createElement('td');
                tit.innerHTML = storedItems[i].title;
                var pr = document.createElement('td');
                pr.innerHTML = storedItems[i].price;
                var tex = document.createElement('td');
                tex.innerHTML = storedItems[i].texas;
                var ad = document.createElement('td');
                ad.innerHTML = storedItems[i].ads;
                var disc = document.createElement('td');
                disc.innerHTML = storedItems[i].discount;
                var tot = document.createElement('td');
                tot.innerHTML = storedItems[i].total;
                var cat = document.createElement('td');
                cat.innerHTML = storedItems[i].category;
    
                var updateBtn = document.createElement('button');
                updateBtn.innerHTML = 'Update';
                updateBtn.className = 'update';
                updateBtn.classList.add("rounded-3" , "small" , "ps-3" , "pe-3" , "pt-2" , "pb-2");
                var btnUp = document.createElement('td')
                btnUp.appendChild(updateBtn);
    
                var deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = 'Delete';
                deleteBtn.className = 'delete';
                deleteBtn.classList.add("rounded-3" , "small" , "ps-3" , "pe-3" , "pt-2" , "pb-2");
                var btnDel = document.createElement('td')
                btnDel.appendChild(deleteBtn);
    
                tr.appendChild(id);
                tr.appendChild(tit);
                tr.appendChild(pr);
                tr.appendChild(tex);
                tr.appendChild(ad);
                tr.appendChild(disc);
                tr.appendChild(tot);
                tr.appendChild(cat);
                tr.appendChild(btnUp);
                tr.appendChild(btnDel);
    
                tBody.appendChild(tr);
                delDiv.innerHTML = `<Button class="btn btn-del p-2 w-100" id="btn-del">Delete All {${storedItems.length}}</Button>`;
            }
        } 
        else
        {
            console.log('NotFound');
        } 
    }
}
fetchDataFromLocalStorage();

console.log(items);

//Calculate Total
function totalCalculate() 
{   
    if(price.value != '')
    {
        var tot = (+price.value + +texas.value + +ads.value) - +discount.value;
        total.innerHTML = tot;
        total.style.backgroundColor = 'rgb(59, 167, 59)';
    }
    else
    {
        total.style.backgroundColor = 'rgb(255, 44, 44)';
        total.innerHTML = 0;
    }
}

//clean data in Input function
function cleanInput()
{
    title.value = '';
    price.value = '';
    texas.value = '';
    ads.value = '';
    discount.value = '';
    count.value = 1;
    category.value = '';
    total.innerHTML = 'Total:';
}

//Creat Item Function
submit.onclick =  function()
{   
    if(isCreate === true)
    {
        if(price.value != '' && title.value != '')
        {
            for(var i = 0 ; i < count.value ; i++)
            {
                var newItem = {
                    title : title.value,
                    price: price.value,
                    texas: texas.value,
                    ads: ads.value,
                    discount: discount.value,
                    total: (+price.value + +texas.value + +ads.value) - +discount.value,
                    count:count.value,
                    category:category.value
                }   
    
                tBody.innerHTML = ``;
                //push in array
                items.push(newItem);
                //set array in localstorage
                localStorage.setItem("items", JSON.stringify(items));
            }
            fetchDataFromLocalStorage()
            cleanInput();
            location.reload();
        } 
    }
    else
    {
        items[updateIndex]['title'] = title.value;
        items[updateIndex]['price'] = price.value;
        items[updateIndex]['texas'] = texas.value;
        items[updateIndex]['ads'] = ads.value;
        items[updateIndex]['discount'] = discount.value;
        items[updateIndex]['category'] = category.value;
        localStorage.removeItem('items');
        localStorage.setItem('items' , JSON.stringify(items));
        submit.innerHTML = 'Create';
        isCreate = true;
        cleanInput();
        location.reload();
    }   
};


//delete item
var delItemBtns = document.querySelectorAll('.delete');

delItemBtns.forEach((element , index) => {
    element.addEventListener('click' , ()=>{
        tBody.innerHTML = ``;
        items.splice(index , 1);
        localStorage.removeItem('items');
        localStorage.setItem('items' , JSON.stringify(items));
    
        fetchDataFromLocalStorage();
        location.reload();
    }); 
});


//delete all items
delDiv.addEventListener('click' , ()=>{ 
    if(items.length > 0)
    {
        localStorage.clear();
        items.splice(0);  
        tBody.innerHTML = ``;
        delDiv.innerHTML = ``;
        location.reload();
    }
});      

//update data for item
var updateBtns = document.querySelectorAll('.update');
// console.log(updateBtns);

updateBtns.forEach((ele , index) => {
    ele.addEventListener('click' , ()=>{
        title.value = items[index]['title'];
        price.value = items[index]['price'];
        texas.value = items[index]['texas'];
        ads.value = items[index]['ads'];
        discount.value = items[index]['discount'];
        category.value = items[index]['category'];
        isCreate = false;
        // tot.innerHTML = (+price.value + +texas.value + +ads.value) - +discount.value;
        submit.innerHTML = 'Update';
        updateIndex = index;
        console.log(updateIndex);
        window.scrollTo(0, 0);

    });
})

var tableRows = document.getElementsByClassName('table-row');


//search by title and category
function filterItems(type , array)
{
    if(type === 'title')
    {
        //display none
        for(var i = 0 ; i < array.length ; i++)
        {
            if(array[i].title != search.value)
            {
                tableRows[i].style.display = 'none';
            }
        }
    }
    if(type === 'category')
    {
        for(var i = 0 ; i < array.length ; i++)
        {
            if(array[i].category != search.value)
            {
                tableRows[i].style.display = 'none';
            }
        }
    }
}

btnTitle.onclick = ()=>{
    filterItems('title' , items);
};
btnCategory.onclick = ()=>{
    filterItems('category' , items);
}




 //create row in table
            // var tr = document.createElement('tr');
            // tr.className = 'table-row';
            // var id = document.createElement('td');
            // id.innerHTML = items.length;
            // var tit = document.createElement('td');
            // tit.innerHTML = title.value;
            // var pr = document.createElement('td');
            // pr.innerHTML = price.value;
            // var tex = document.createElement('td');
            // tex.innerHTML = texas.value;
            // var ad = document.createElement('td');
            // ad.innerHTML = ads.value;
            // var disc = document.createElement('td');
            // disc.innerHTML = discount.value;
            // var tot = document.createElement('td');
            // tot.innerHTML = (+price.value + +texas.value + +ads.value) - +discount.value;//problem
            // var cat = document.createElement('td');
            // cat.innerHTML = category.value;
    
            // var updateBtn = document.createElement('button');
            // updateBtn.innerHTML = 'Update';
            // updateBtn.className = 'update';
            // updateBtn.classList.add("rounded-3" , "small" , "ps-3" , "pe-3" , "pt-2" , "pb-2");
            // var btnUp = document.createElement('td')
            // btnUp.appendChild(updateBtn);
    
            // var deleteBtn = document.createElement('button');
            // deleteBtn.innerHTML = 'Delete';
            // deleteBtn.className = 'delete';
            // deleteBtn.classList.add("rounded-3" , "small" , "ps-3" , "pe-3" , "pt-2" , "pb-2");
            // var btnDel = document.createElement('td');
            // btnDel.appendChild(deleteBtn);
    
            // tr.appendChild(id);
            // tr.appendChild(tit);
            // tr.appendChild(pr);
            // tr.appendChild(tex);
            // tr.appendChild(ad);
            // tr.appendChild(disc);
            // tr.appendChild(tot);
            // tr.appendChild(cat);
            // tr.appendChild(btnUp);
            // tr.appendChild(btnDel);
    
            // tBody.appendChild(tr);
            // showData();