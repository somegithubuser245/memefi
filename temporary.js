document.querySelector('.MuiTypography-root.MuiTypography-bodyMicroSemiBold.css-1dbppyq'); // Максимальное значение энергии
document.querySelector('.MuiTypography-root.MuiTypography-bodySmallExtraBold.css-rigfui'); // Текущее значение энергии 

getCurrentValue() {
    // Получение текстового содержимого элемента энергии и его преобразование в число
    const energyText = this.currentEnergy.innerText.trim().replace('/', '');
    const currentValue = parseFloat(energyText.replace(',', ''));
    return currentValue;
}

simulateClick(x, y, targetElement) {
    this.simulatePointerEvent('pointerdown', x, y, targetElement);
    this.simulatePointerEvent('pointermove', x, y, targetElement);
    this.simulatePointerEvent('pointerup', x, y, targetElement);
}

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

function getRandomDigit(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Метод для симуляции следующей серии кликов
clickNext() {
    // Обновление текущего значения энергии
    this.energyValue = this.getCurrentValue();
    console.log(`Текущая энергия: ${this.energyValue}`);

    // Проверка достижения текущего значения энергии порогового значения
    if (this.energyValue <= this.randomStop) {
        console.log('Достигнут лимит по энергии');
        const pauseTime = getRandomDigit(60000.0, 65000.0);
        console.log(`Беру паузу на ${pauseTime / 60000} минут`);
        setTimeout(() => this.simulateClickSeries(), pauseTime); // Установка паузы перед следующей серией кликов в диапазоне (от 1 до 3 минут)
        return;
    }

    // Генерация случайного количества кликов в заданном диапазоне
    const clickCount = getRandomDigit(1.0, 300.0);
    let clickIndex = 0;

    const next = () => {
        if (clickIndex < clickCount) {
            // Обновление текущего значения энергии
            this.energyValue = this.getCurrentValue();
            console.log(`Обновленная текущая энергия: ${this.energyValue}`);

            // Проверка достижения текущего значения энергии порогового значения
            if (this.energyValue <= this.randomStop) {
                console.log('Достигнут лимит по энергии');
                const pauseTime = getRandomDigit(60000.0, 65000.0);
                console.log(`Беру паузу на ${pauseTime / 60000} минут`);
                setTimeout(() => this.simulateClickSeries(), pauseTime); // Установка паузы перед следующей серией кликов в диапазоне (от 1 до 3 минут)
                return;
            }

            // Генерация случайных координат для каждого клика в заданном диапазоне
            const x = getRandomDigit(14.0, 395.0);
            const y = getRandomDigit(300.0, 500.0);

            // Определение целевого элемента для клика по координатам
            const targetElement = document.elementFromPoint(x, y);

            if (targetElement) {
                this.simulateClick(x, y, targetElement);
                clickIndex++;
                setTimeout(next, getRandomDigit(15, 1500)); // Установка задержки перед следующим кликом
            } else {
                console.error('Invalid coordinates');
            }
        } else {
            setTimeout(() => this.clickNext(), getRandomDigit(1000.0, 30000.0));
        }
    };

    next();
}



class Clicker {
    #boostersButtonName;
    #turboButtonName;
    #rechargeButtonName;
    #claimButtonName
    #upgradesName;
    #energyContainerName;

    #tappableDivName;

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
        this.#boostersButtonName = 'MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeDecorativePrimary MuiButton-containedSizeDecorativePrimary MuiButton-colorPrimary MuiButtonGroup-grouped MuiButtonGroup-groupedHorizontal MuiButtonGroup-groupedContained MuiButtonGroup-groupedContainedHorizontal MuiButtonGroup-groupedContainedPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeDecorativePrimary MuiButton-containedSizeDecorativePrimary MuiButton-colorPrimary MuiButtonGroup-firstButton css-rqshat';
        this.#turboButtonName = 'MuiButtonBase-root MuiButton-root MuiButton-primary MuiButton-primaryPrimary MuiButton-sizeLarge MuiButton-primarySizeLarge MuiButton-colorPrimary MuiButton-root MuiButton-primary MuiButton-primaryPrimary MuiButton-sizeLarge MuiButton-primarySizeLarge MuiButton-colorPrimary css-1opfuue';
        this.#rechargeButtonName = 'MuiButtonBase-root MuiButton-root MuiButton-primary MuiButton-primaryPrimary MuiButton-sizeLarge MuiButton-primarySizeLarge MuiButton-colorPrimary MuiButton-root MuiButton-primary MuiButton-primaryPrimary MuiButton-sizeLarge MuiButton-primarySizeLarge MuiButton-colorPrimary css-1opfuue';
        this.#claimButtonName = 'MuiButtonBase-root MuiButton-root MuiButton-primary MuiButton-primaryPrimary MuiButton-sizeLarge MuiButton-primarySizeLarge MuiButton-colorPrimary MuiButton-root MuiButton-primary MuiButton-primaryPrimary MuiButton-sizeLarge MuiButton-primarySizeLarge MuiButton-colorPrimary css-1ew4p28';
        this.#upgradesName = 'MuiTypography-root MuiTypography-bodyLittleBold css-1r6tses';
        this.#energyContainerName = '.MuiBox-root.css-zbz8kf > span';
        this.#tappableDivName = 'div.css-rvxusy';

        this.#damagePrice = 0;
        this.#energyCapPrice = 0;
        this.#tapBotPrice = 200000;
        this.#rechargeSpeedPrice = 0;

        this.#energyBoosterOn = false;
        this.#turboBoosterOn = false;

        this.#pauseTime = 1000;

        this.boostersButtonElement = document.getElementsByClassName(this.#boostersButtonName);
        this.turboButtonElement = document.getElementsByClassName(this.#turboButtonName);
        this.rechargeButtonElement = document.getElementsByClassName(this.#rechargeButtonName);
        this.claimButtonname = document.getElementsByClassName(this.#claimButtonName);

        this.tapArea = document.querySelector(this.#tappableDivName); // Selecting the first element
        console.log(this.tapArea);
        // Check if the tapArea element exists before proceeding
        if (this.tapArea) {
            // Get the bounding client rect
            const rect = this.tapArea.getBoundingClientRect();

            // Assign values based on the rect
            this.#tapAreaOffsetX = rect.left;
            this.#tapAreaOffsetY = rect.top;
            this.#tapAreaWidth = rect.width;
            this.#tapAreaHeight = rect.height;

            console.log('Tap Area Width:', this.#tapAreaWidth);
            console.log('Tap Area Height:', this.#tapAreaHeight);

        } else {
            this.#tapAreaHeight = 0;
            this.#tapAreaWidth = 0;
            this.#tapAreaOffsetX = 0;
            this.#tapAreaOffsetY = 0;
            console.error('Tap area element not found');
        }

        this.#randomTapX = 0;
        this.#randomTapY = 0;
        //energy values parsing
        this.spans = document.querySelectorAll(this.#energyContainerName);

        this.maxEnergy = this.getEnergyDigitValue(this.spans[1]);
        this.currentEnergy = this.getEnergyDigitValue(this.spans[0]);

        console.log('Current Energy:', this.currentEnergy);
        console.log('Max Energy:', this.maxEnergy);

        this.upgradesList = document.getElementsByClassName(this.#upgradesName);
    }

    updateEnergyValues() {
        this.maxEnergy = this.getEnergyDigitValue(this.spans[1]);
        this.currentEnergy = this.getEnergyDigitValue(this.spans[0]);
    }

    updateCurrentEnergy() {
        this.currentEnergy = this.getEnergyDigitValue(this.spans[0]);
    }

    getEnergyDigitValue(element) {
        return parseFloat(element.textContent.trim().replace('/', '').replace(',', ''));
    }

    getRandomDigit(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

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

    simulateClick(x, y, targetElement) {
        this.simulatePointerEvent('pointerdown', x, y, targetElement);
        this.simulatePointerEvent('pointermove', x, y, targetElement);
        this.simulatePointerEvent('pointerup', x, y, targetElement);
    }

    setRandomTapCoordinates() {
        const randomXRelativeToCanvas = Math.floor(Math.random() * this.#tapAreaWidth);
        const randomYRelativeToCanvas = Math.floor(Math.random() * this.#tapAreaHeight);

        this.#randomTapX = this.#tapAreaOffsetX + randomXRelativeToCanvas;
        this.#randomTapY = this.#tapAreaOffsetY + randomYRelativeToCanvas;
    }

    setPauseTime(pauseTime) {
        this.#pauseTime = pauseTime;
    }

    // Метод для симуляции следующей серии кликов
    clickNext() {
        // Обновление текущего значения энергии
        this.updateCurrentEnergy();
        console.log(`Текущая энергия: ${this.currentEnergy}`);
        let updatedEnergy = this.currentEnergy;

        // Проверка достижения текущего значения энергии порогового значения
        if (updatedEnergy <= 10) {
            console.log('Достигнут лимит по энергии');
            const pauseTime = this.getRandomDigit(60000.0, 65000.0);
            console.log(`Беру паузу на ${pauseTime / 60000} минут`);
            setTimeout(() => this.simulateClickSeries(), pauseTime); // Установка паузы перед следующей серией кликов в диапазоне (от 1 до 3 минут)
            return;
        }

        // Генерация случайного количества кликов в заданном диапазоне
        const clickCount = this.getRandomDigit(100, 300);
        let clickIndex = 0;

        const next = () => {
            if (clickIndex < clickCount) {
                // Обновление текущего значения энергии
                this.updateCurrentEnergy();
                console.log(`Обновленная текущая энергия: ${this.currentEnergy}`);
                let updatedEnergy = this.currentEnergy;

                // Проверка достижения текущего значения энергии порогового значения
                if (updatedEnergy <= 10) {
                    console.log('Достигнут лимит по энергии');
                    const pauseTime = getRandomDigit(60000.0, 65000.0);
                    console.log(`Беру паузу на ${pauseTime / 60000} минут`);
                    setTimeout(() => this.simulateClickSeries(), pauseTime); // Установка паузы перед следующей серией кликов в диапазоне (от 1 до 3 минут)
                    return;
                }
                
                this.setRandomTapCoordinates();
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
