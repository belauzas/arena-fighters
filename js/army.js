"use strict";

import LocalStorage from './localStorage.js';
import Page from './page.js';
import units from './units.js';

(function() {
    const DB = new LocalStorage();
    const page =  new Page();

    const armyPage = document.querySelector('.page.page-army');
    const selectFrom = armyPage.querySelector('.select-from > .list');

    const unitView = armyPage.querySelector('.unit-details');
    const unitImg = unitView.querySelector('.unit-preview > img');
    const unitDetails = unitView.querySelector('.details');
    const unitName = unitDetails.querySelector('.title');
    const unitLevels = unitDetails.querySelectorAll('.level');
    const unitLevelsDOM = {};
    
    const myArmy = armyPage.querySelector('.selected-list > .list');
    const startBtn = armyPage.querySelector('.selected-list > .start');

    const levels = {
        health: { min: 0, max: 1000 },
        attack: { min: 0, max: 100 },
        deffence: { min: 0, max: 100 },
        deffenceRegeneration: { min: 0, max: 100 },
        accuracy: { min: 0, max: 100 },
        rateOfFire: { min: 1, max: 3 }
    }

    for ( let i=0; i<unitLevels.length; i++ ) {
        const type = unitLevels[i].dataset.level;
        unitLevelsDOM[type] = {
            value: unitLevels[i].querySelector('.value'),
            bar: unitLevels[i].querySelector('.bar-value')
        }
    }
    
    const renderList = () => {
        let HTML = '';
        for ( let i=0; i<units.length; i++ ) {
            const unit = units[i];
            HTML += `<div class="unit" data-unit="${unit.type}">
                        <img src="./img/units/${unit.type}.png">
                    </div>`;
        }
        selectFrom.innerHTML = HTML;
    }

    const currentLevelValue = ( type, value ) => {
        const min = levels[type].min;
        const max = levels[type].max;
        console.log(type, value, min, max);
        
        return Math.round( (value-min) / (max-min) * 100 );
    }

    const showUnitDetails = (e) => {
        const unit = e.target.closest('.unit');
        const unitType = unit.dataset.unit;
        const unitData = units.filter(u => u.type === unitType)[0];
        
        if ( selectFrom.querySelector('.unit.active') ) {
            selectFrom.querySelector('.unit.active').classList.remove('active');
        }
        unit.classList.add('active');

        unitImg.src = `./img/units/${unitType}.png`;
        unitName.textContent = unitType;

        const stats = ['health', 'attack', 'deffence', 'deffenceRegeneration', 'accuracy', 'rateOfFire'];
        for ( let i=0; i<stats.length; i++) {
            const stat = stats[i];
            let level = 0;
            let levelValue = 0;
            if ( stat === 'rateOfFire' ) {
                level = unitData[stat].current;
                levelValue = currentLevelValue( stat, level );
            } else {
                level = unitData[stat];
                levelValue = currentLevelValue( stat, level );
            }
            unitLevelsDOM[stat].value.textContent = level;
            unitLevelsDOM[stat].bar.style.width = levelValue + '%';
        }
    }

    const startBattle = () => {
        if ( startBtn.classList.contains('disabled') ) {
            return;
        }

        console.log('START BATTLE...');
    }

    renderList();

    const unitsSelectFrom = selectFrom.querySelectorAll('.unit');
    for (let i=0; i<unitsSelectFrom.length; i++) {
        const unit = unitsSelectFrom[i];
        unit.addEventListener('click', showUnitDetails)
    }

    startBtn.addEventListener('click', startBattle)
})();