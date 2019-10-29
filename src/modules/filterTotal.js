export default function filterTotal(){

    const status        = document.getElementById('status'),
          priority      = document.getElementById('priority'),
          search        = document.getElementById('search');

    function filter(){
        const newTaskAll    = document.querySelectorAll('.newTask');
        const searchText = new RegExp('^' + search.value.trim(), 'i');
        if(newTaskAll){
            newTaskAll.forEach(elem => {
                const titleSearch = elem.querySelector('h4').textContent;
                    if(status.value === 'all' && priority.value !== 'all' && searchText.test(titleSearch)){
                        elem.style.display = '';
                    }
                    else if( status.value !== 'all' && elem.getAttribute('status') !== status.value ){
                        elem.style.display = 'none';
                    }
                    else if( (priority.value !== 'all' && elem.getAttribute('priority') !== priority.value) ){
                        elem.style.display = 'none';
                    }
                    else if(!searchText.test(titleSearch)){
                        elem.style.display = 'none';
                    }
                    else elem.style.display = '';  

                    if(priority.value !== 'all' && elem.getAttribute('priority') !== priority.value){
                        elem.style.display = 'none';
                    }         
            });
        }
    };

    
    status.addEventListener('change', filter);
    priority.addEventListener('change', filter);
    search.addEventListener('input', filter);
}
