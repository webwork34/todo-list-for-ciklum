export default function createTask(){

    const createEditWindow    = document.querySelector('.createEditWindow'),
          cancel        = document.getElementById('cancel'),
          save          = document.getElementById('save'),
          field         = document.querySelector('.field'),
          title         = document.getElementById('title'),
          description   = document.getElementById('description'),
          subPriority   = document.getElementById('subPriority'),
          status        = document.getElementById('status'),
          priority      = document.getElementById('priority'),
          search        = document.getElementById('search');

    const newTask = document.createElement('div');
    field.appendChild(newTask).classList.add('newTask');

    const done = document.createElement('div');
    newTask.appendChild(done).classList.add('done');

    const h4 = document.createElement('h4');
    newTask.appendChild(h4);
    h4.textContent = title.value;
    title.value = '';

    const p = document.createElement('p');
    newTask.appendChild(p);
    p.textContent = description.value;
    description.value = '';

    const priorityDiv = document.createElement('div');
    newTask.appendChild(priorityDiv).classList.add('priorityDiv');
    priorityDiv.textContent = subPriority.value;
    newTask.setAttribute('status', 'open');
    newTask.setAttribute('priority', subPriority.value);
    subPriority.value = 'high';

    const stateDiv = document.createElement('div');
    newTask.appendChild(stateDiv).classList.add('stateDiv');
    stateDiv.textContent = '...';

    const stateMenu = document.createElement('div');
    newTask.appendChild(stateMenu).classList.add('stateMenu');

    const arrow = document.createElement('div');
    stateMenu.appendChild(arrow).classList.add('arrow');

    const stateDone = document.createElement('div');
    stateMenu.appendChild(stateDone).classList.add('stateDone');
    stateDone.textContent = 'done';

    const stateEdit = document.createElement('div');
    stateMenu.appendChild(stateEdit).classList.add('stateEdit');
    stateEdit.textContent = 'edit';

    const stateDelete = document.createElement('div');
    stateMenu.appendChild(stateDelete).classList.add('stateDelete');
    stateDelete.textContent = 'delete';

    const states = document.querySelectorAll('.stateDiv');

    document.addEventListener('click', () => {
        if(states){
            states.forEach(elem => {
                elem.nextElementSibling.classList.remove('show');
            });
        }
    });    

    createEditWindow.style.display = 'none';

    stateDiv.addEventListener('click', function(e) {
        e.stopPropagation();
        if(this.nextElementSibling.classList.contains('show')){
            this.nextElementSibling.classList.remove('show');
        }else{
            for (let i = 0; i < states.length; i++){
                states[i].nextElementSibling.classList.remove('show');
                this.nextElementSibling.classList.add('show');
            }
        }
    });

    stateDone.addEventListener('click', function(e) {
        if(this.closest('.newTask').getAttribute('status') !== 'done'){
            this.closest('.newTask').style.background = 'lightgrey';
            done.style.display = 'block';
            newTask.setAttribute('status', 'done');
            if(newTask.getAttribute('status') !== status.value && status.value !== 'all'){
                newTask.style.display = 'none';
            }
        }else{
            e.stopPropagation();
        }
    });

    function saveChanges(){
        h4.textContent = title.value;
        title.value = '';

        p.textContent = description.value;
        description.value = '';

        priorityDiv.textContent = subPriority.value;
        newTask.setAttribute('priority', subPriority.value);
        subPriority.value = 'high';
        if(
            (newTask.getAttribute('priority') !== priority.value && priority.value !== 'all')
            || (newTask.getAttribute('status') !== status.value && status.value !== 'all')
            || (h4.textContent !== search.value && search.value !== '')
        ){
            newTask.style.display = 'none';
        }

        createEditWindow.style.display = 'none';
        save.removeEventListener('click', saveChanges);
        save.addEventListener('click', createTask);
    };

    function hideCreateEditWindow(){
        title.value = '';
        description.value = '';
        subPriority.value = 'high';
        createEditWindow.style.display = 'none';
        save.removeEventListener('click', saveChanges);
        save.addEventListener('click', createTask);
    }

    cancel.addEventListener('click', hideCreateEditWindow);
    createEditWindow.addEventListener('click', hideCreateEditWindow);

    stateEdit.addEventListener('click', function(e){
        if(this.closest('.newTask').getAttribute('status') !== 'done'){
            createEditWindow.style.display = 'block';
            title.value = this.closest('.newTask').querySelector('h4').textContent;
            description.value = this.closest('.newTask').querySelector('p').textContent;
            subPriority.value = this.closest('.newTask').querySelector('.priorityDiv').textContent;
            save.removeEventListener('click', createTask);
            save.addEventListener('click', saveChanges);
        }else{
            e.stopPropagation();
        }
    });

    stateDelete.addEventListener('click', function(){
        this.closest('.newTask').remove();
    });

};