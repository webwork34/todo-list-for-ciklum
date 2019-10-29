export default function clearFilter(){
    const status        = document.getElementById('status'),
          priority      = document.getElementById('priority'),
          search        = document.getElementById('search'),
          newTaskAll    = document.querySelectorAll('.newTask');

    search.value = '';
    status.value = 'all';
    priority.value = 'all';

    if(newTaskAll){
        newTaskAll.forEach(e => {
            e.style.display = '';
        });
    }
}