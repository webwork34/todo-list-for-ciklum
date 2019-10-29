import createTask from './createTask';
import clearFilter from './clearFilter';

export default function create(){

    const createBtn     = document.getElementById('create'),
          save          = document.getElementById('save'),
          subCont       = document.querySelector('.subCont');

    createBtn.addEventListener('click', () => {
        const createEditWindow    = document.querySelector('.createEditWindow');
        clearFilter();
        createEditWindow.style.display = 'block';
    
        function clearForm(){
            title.value = '';
            description.value = '';
            subPriority.value = 'high';
            createEditWindow.style.display = 'none';
        }

        cancel.addEventListener('click', clearForm);
        createEditWindow.addEventListener('click', clearForm);
    });

    subCont.addEventListener('click', e => {
        e.stopPropagation();
    });
    
    save.addEventListener('click', createTask);
}
