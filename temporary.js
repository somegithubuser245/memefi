class Clicker {
    // #boostersButtonName;
    // #boostersButtonsName;
    // #rechargeButtonName;
    // #claimButtonName
    // #upgradesName;
    #energyContainerName;
    #tappableDivName;
    #buttonsContainerName;

    #damagePrice;
    #energyCapPrice;
    #tapBotPrice;
    #rechargeSpeedPrice;

    #tapAreaOffsetX;
    #tapAreaOffsetY;
    #tapAreaWidth;
    #tapAreaHeight;
    #randomTapX;
    #randomTapY;

    #energyBoosterOn;
    #turboBoosterOn;

    #pauseTime;

    constructor() {
        //МУСОР
        this.boostersButtonName = 'MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeDecorativePrimary MuiButton-containedSizeDecorativePrimary MuiButton-colorPrimary MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeDecorativePrimary MuiButton-containedSizeDecorativePrimary MuiButton-colorPrimary MuiButtonGroup-firstButton css-rqshat';
        this.boostersButtonsName = 'MuiButtonBase-root MuiButton-root MuiButton-primary MuiButton-primaryPrimary MuiButton-sizeLarge MuiButton-primarySizeLarge MuiButton-colorPrimary MuiButton-root MuiButton-primary MuiButton-primaryPrimary MuiButton-sizeLarge MuiButton-primarySizeLarge MuiButton-colorPrimary css-1opfuue';
        this.claimButtonName = 'MuiButtonBase-root MuiButton-root MuiButton-primary MuiButton-primaryPrimary MuiButton-sizeLarge MuiButton-primarySizeLarge MuiButton-colorPrimary MuiButton-root MuiButton-primary MuiButton-primaryPrimary MuiButton-sizeLarge MuiButton-primarySizeLarge MuiButton-colorPrimary css-1ew4p28';
        this.upgradesName = 'MuiTypography-root MuiTypography-bodyLittleBold css-1r6tses';
        this.#energyContainerName = '.MuiBox-root.css-zbz8kf > span';
        this.#tappableDivName = 'div.css-rvxusy';
        this.#buttonsContainerName = 'div.MuiButtonGroup-root.MuiButtonGroup-contained.css-90nww4 > button'

        //цены на улучшалки
        this.#damagePrice = 0;
        this.#energyCapPrice = 0;
        this.#tapBotPrice = 200000;
        this.#rechargeSpeedPrice = 0;

        //хрень, чтобы отслеживать когда быстрее тапать
        this.#energyBoosterOn = false;
        this.#turboBoosterOn = false;

        //время глобальной паузы
        this.#pauseTime = 1000;

        //определяем сейчас, чтобы было удобно использовать потом 
        //ТУДУ - СДЕЛАТЬ ЗНАЧЕНИЯ ЧИСЛОВЫМИ И ХРАНИТЬ ИХ В ПАМЯТИ
        this.boostersButtonElement = null;
        this.turboButtonElement = null;
        this.rechargeButtonElement = null;
        this.boostersButtonElement = document.querySelector(this.#buttonsContainerName);

        //ТАП АРЕА ЕПТ, МЕСТО КУДА МОЖНО ТЫКАТЬ
        this.tapArea = document.querySelector(this.#tappableDivName); 
        //ХРЕНЬ ОТ ГПТ, ОПРЕДЕЛЯЕМ ГРАНИЦЫ ЭЛЕМЕНТА (НО ЭТО НЕ ТОЧНО)
        const rect = this.tapArea.getBoundingClientRect();

        //НАСТРОЙКА ДАННЫХ ТИПА ШИРИНЫ/ДЛИНЫ ПОЛЯ, ЕГО ГЛОБАЛЬНЫХ КООРДИНАТ
        //ТУДУ - СДЕЛАТЬ АПДЕЙТЕР С ИВЕНТЛИСТЕНЕРОМ
        this.#tapAreaOffsetX = rect.left;
        this.#tapAreaOffsetY = rect.top;
        this.#tapAreaWidth = rect.width;
        this.#tapAreaHeight = rect.height;

        //ОПРЕДЕЛЯЕМ ЗНАЧЕНИЯ, ПОЗЖЕ ПОНАДОБЯТЬСЯ ДЛЯ КООРДИНАТ
        this.#randomTapX = 0;
        this.#randomTapY = 0;

        //ПАРСИМ ЗНАЧЕНИЯ ЭНЕРГИИ ЧЕРЕЗ ВЫБОР ВСЕХ СПАНОВ В ДИВЕ
        //ТУДУ А НАДО ЛИ ТУТ ВООБЩЕ ВЫДЕЛЯТЬ ДЛЯ НЕГО МЕСТО В ПАМЯТИ?
        this.spans = document.querySelectorAll(this.#energyContainerName);

        //ПРЕОБРАЗУЕМ В ЧИСЛОВЫЕ ЗНАЧЕНИЯ
        this.maxEnergy = this.getEnergyDigitValue(this.spans[1]);
        this.currentEnergy = this.getEnergyDigitValue(this.spans[0]);

        //upgradeListDefinition
        //ТУДУ ТОЖЕ МОЖНО ИЗ КОНСТРУКТОРА УБРАТЬ СКОРЕЕ ВСЕГО
        this.upgradesList = null;
    }

    //ПОЛУЧАЕМ СТАТУ ПО АПГРЕЙДАМ. ФУНКЦИЯ СЫРАЯ
    getStats() {
        this.boostersButtonElement.click();

        setTimeout(() => {
            this.turboButtonElement = document.getElementsByClassName(this.boostersButtonsName)[0];
            this.rechargeButtonElement = document.getElementsByClassName(this.boostersButtonsName)[1];

            console.log(this.turboButtonElement);
            console.log(this.rechargeButtonElement);
            console.log(this.claimButtonElement);

            this.upgradesList = document.getElementsByClassName(this.upgradesName);

            let stats = [];
            for(var i = 0; i < this.upgradesList.length; i++) {
                stats[i] = this.getEnergyDigitValue(this.upgradesList[i]);
                console.log(stats[i]);
            }
    
            this.tapBotPrice = this.getEnergyDigitValue(stats[0]);        
            this.#damagePrice = this.getEnergyDigitValue(stats[1]);
            this.#energyCapPrice = this.getEnergyDigitValue(stats[2]);
            

        }, 100);
    }

    //ОБНОВЛЯЕМ ЗНАЧЕНИЯ ЭНЕРГИИ
    //ТУДУ А МОЖЕТ НАХУЙ НЕ НУЖНА ЭТА ФУНКЦИЯ
    updateEnergyValues() {
        this.maxEnergy = this.getEnergyDigitValue(this.spans[1]);
        this.currentEnergy = this.getEnergyDigitValue(this.spans[0]);
    }

    //ОБНОВЛЯЕМ ТЕКУЩУЮ ЭНЕРГИЮ
    updateCurrentEnergy() {
        this.currentEnergy = this.getEnergyDigitValue(this.spans[0]);
    }

    //ДОСТАЕМ ЧИСЛО ИЗ ХТМЛ ЭЛЕМЕНТА
    getEnergyDigitValue(element) {
        //ПРОВЕРКА НЕ РАБОТАЕТ, НУЖНО ЧЕТ ПЕРЕДЕЛАТЬ
        if(element != null || element.textContent[0] != 'M') {
            return parseFloat(element.textContent.trim().replace('/', '').replace(',', ''));
        } else {
            return 0;
        }
    }

    //РАНДОМАЙЗЕР ЧИСЕЛ ЕМАЕ
    getRandomDigit(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //ГПТ
    simulatePointerEvent(type, x, y, target) {
        const event = new PointerEvent(type, {
            pointerType: 'touch',
            clientX: x,
            clientY: y,
            bubbles: true,
            cancelable: true,
            composed: true,
        });
        target.dispatchEvent(event);
    }

    //ГПТ
    simulateClick(x, y, targetElement) {
        this.simulatePointerEvent('pointerdown', x, y, targetElement);
        this.simulatePointerEvent('pointermove', x, y, targetElement);
        this.simulatePointerEvent('pointerup', x, y, targetElement);
    }

    //рандомайзер координат
    setRandomTapCoordinates() {
        const randomXRelativeToCanvas = Math.floor(Math.random() * this.#tapAreaWidth); //рандомный х по ширине
        const randomYRelativeToCanvas = Math.floor(Math.random() * this.#tapAreaHeight); //рандомный у по высоте

        //добавляем к глобальным координатам по экрану
        this.#randomTapX = this.#tapAreaOffsetX + randomXRelativeToCanvas;
        this.#randomTapY = this.#tapAreaOffsetY + randomYRelativeToCanvas;
    }

    //СЕТТИМ ПОЛЕ ПАУЗЫ. ГЛОБАЛЬНОЕ В КЛАССЕ
    setPauseTime(pauseTime) {
        this.#pauseTime = pauseTime;
    }

    //РАНДОМАЙЗЕР СНА С ФУНКЦИЕЙ ОТКИДА НА ПАРУ ЧАСОВ
    randomIdle() {
        let globalRandom = this.getRandomDigit(10, 100); //рандомное значения для решения, сколько часов спать. работает больше по вероятности.

        if(globalRandom > 93) {
            let randomIdle = 60000 * 60 * this.getRandomDigit(1, 6);
            this.setPauseTime(randomIdle);
            console.log(randomIdle / 60000);
        } else {
            let randomIdle = 60000 * this.getRandomDigit(10, 30);
            this.setPauseTime(randomIdle);
            console.log(randomIdle / 60000);
        }
    }

    // Метод для симуляции следующей серии кликов
    clickNext() {
        // Генерация случайного количества кликов в заданном диапазоне
        const clickCount = this.getRandomDigit(100, 300);
        let clickIndex = 0;

        const next = () => {
            if (clickIndex < clickCount) {
                // Обновление текущего значения энергии
                this.updateCurrentEnergy();
                // console.log(`Обновленная текущая энергия: ${this.currentEnergy}`);
                let updatedEnergy = this.currentEnergy;

                // Проверка достижения текущего значения энергии порогового значения
                if (updatedEnergy <= 10) {
                    // console.log('Достигнут лимит по энергии');

                    this.randomIdle(); //сеттер времени с возможностью рандомного сна. updates #pauseTime
                    const pauseTime = this.#pauseTime;

                    console.log(`Беру паузу на ${pauseTime / 60000} минут`);
                    setTimeout(() => this.simulateClickSeries(), pauseTime); // Установка паузы перед следующей серией кликов в диапазоне (от 1 до 3 минут)
                    return;
                }

                this.setRandomTapCoordinates(); //сеттер координат в пределах тапельного элемента
                const x = this.#randomTapX;
                const y = this.#randomTapY;

                // Определение целевого элемента для клика по координатам
                const targetElement = document.elementFromPoint(x, y);

                if (targetElement) {
                    this.simulateClick(x, y, targetElement);
                    setTimeout(next, this.getRandomDigit(50, 200));
                } else {
                    console.error('Invalid coordinates');
                }
            } else {
                setTimeout(() => this.clickNext(), this.getRandomDigit(1000.0, 30000.0));
            }
        };

        next();
    }

    simulateClickSeries() {
        this.clickNext();
    }
}

const clicker = new Clicker();
clicker.simulateClickSeries();
