class Calendar{
    constructor(id) {
        this.cells = [];
        this.currentMonth = moment();
        this.selectedDate = moment(); // Agregamos una propiedad para almacenar la fecha seleccionada
        this.elCalendar = document.getElementById(id);
        this.showTemplate();
        this.elGridbody = this.elCalendar.querySelector('.grid__body');
        this.elMonthName = this.elCalendar.querySelector('.month-name');
        this.showCells();
    }

    showTemplate(){
        this.elCalendar.innerHTML = this.getTemplate();
        this.addEventListenerToControls();
    }

    getTemplate(){ //codigo del HTML del calendario
        let template = `
            <div class="calendar-header">
                <button type="button" class="control control--prev">&lt;</button>
                <span class="month-name">November 2023</span>
                <button type="button" class="control control--next">&gt;</button>
            </div>
            <div class="calendar-body">
                <div class="grid">
                    <div class="grid__header">
                        <span class="grid__cell grid__cell--gh">Mon</span>
                        <span class="grid__cell grid__cell--gh">Tue</span>
                        <span class="grid__cell grid__cell--gh">Wed</span>
                        <span class="grid__cell grid__cell--gh">Thu</span>
                        <span class="grid__cell grid__cell--gh">Fri</span>
                        <span class="grid__cell grid__cell--gh">Sat</span>
                        <span class="grid__cell grid__cell--gh">Sun</span>
                    </div>
                    <div class="grid__body">
                        
                    </div>
                </div>
            </div>
            `;
            return template;
    }

    addEventListenerToControls() {
        let elControls = this.elCalendar.querySelectorAll('.control');
        elControls.forEach(elControl => {
            elControl.addEventListener('click', e => {
                let elTarget = e.target;
                if (elTarget.classList.contains('control--next')) {
                    this.changeMonth(true);
                } else {
                    this.changeMonth(false);
                }
                this.showCells();
            });
        });
    }

    changeMonth(next = true){
        if (next) {
            this.currentMonth.add(1, 'months');
        } else {
            this.currentMonth.subtract(1, 'months');
        }
    }

    showCells() {
        this.cells = this.generateDates(this.currentMonth);
        if (this.cells === null) {
            return;
        }
        this.elGridbody.innerHTML = '';
        let templateCells = '';
        let disabledClass = '';
        for (let i = 0; i < this.cells.length; i++) {
            disabledClass = '';
            if (!this.cells[i].isInCurrentMonth) {
                disabledClass = 'grid__cell--disabled';
            }
            // Verificamos si la celda representa la fecha seleccionada actual
            let isSelected = this.cells[i].date.isSame(this.selectedDate, 'day');
            templateCells += `
                <span class="grid__cell grid__cell--gd ${disabledClass} ${isSelected ? 'grid__cell--selected' : ''}">
                    ${this.cells[i].date.date()}
                </span>
            `;
        }
        this.elMonthName.innerHTML = this.currentMonth.format('MMMM YYYY');
        this.elGridbody.innerHTML = templateCells;
        this.addEventListenerToCells();
    }

    generateDates(monthToShow = moment()){
        if (!moment.isMoment(monthToShow)){
            return null
        }
        let dateStart = moment(monthToShow).startOf('month'); //obtener la primer fecha del mes
        let dateEnd = moment(monthToShow).endOf('month'); //obtener la ultima fecha del mes
        let cells = [];

        //encontrar la primera fecha que se va a mostrar en el calendario
        while (dateStart.day() !== 1){ // 1 es equivalente a Lunes, 2 Martes, etc.
            dateStart.subtract(1, 'days');
        }
        //encontrar la ultima fecha que se va a mostrar en el calendario
        while (dateEnd.day() !== 0){ // 0 es equivalente a Domingo
            dateEnd.add(1, 'days');
        }
        //genera las fechas del grid o calendario
        do {
            cells.push({
                date: moment(dateStart),
                isInCurrentMonth:dateStart.month() === monthToShow.month()
            });
            dateStart.add(1, 'days');
        } while (dateStart.isSameOrBefore(dateEnd)); //si la fecha de inicio es igual o anterior a la fecha del fin
        return cells;
    }
    
    addEventListenerToCells() {
        let elCells = this.elCalendar.querySelectorAll('.grid__cell--gd');
        elCells.forEach(elCell => {
            elCell.addEventListener('click', e => {
                let elTarget = e.target;
                if (elTarget.classList.contains('grid__cell--disabled') || elTarget.classList.contains('grid__cell--selected')) {
                    return;
                }
                // Actualizamos la fecha seleccionada
                this.selectedDate = moment(elTarget.textContent, 'D');
                // Volvemos a mostrar las celdas con la nueva fecha seleccionada
                this.showCells();
            });
        });
    }
}

// Ejemplo de uso
// const myCalendar = new Calendar('myCalendar');
    
