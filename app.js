// Создание заполнения карточки
let store = {
    state: {
        cardNumber: "",
        cardName: "",
        cardCW: "",
        cardMonth: "",
        cardYear: "",
        colorBank: {
            sberbank: "#045A38",
            tinkoff: "#F8d81c",
            alpha: "#EF3124",
            vtb: "blue",
            default: "rgb(240, 240, 240)",
        },
        paySystem: {
            visa: "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png",
            masterCard:
                "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/mastercard.png",
            mir: "https://i.postimg.cc/59TFvsfM/logo-mir.png",
            eror: "https://i.postimg.cc/5tF3BhL8/eror.png",
        },
    },
    renderPaySystem() {
        let cardWrap = document.querySelector(".card__wrap img");
        switch (this.state.cardNumber[0]) {
            case "2":
                return cardWrap.setAttribute("src", this.state.paySystem.mir);
            case "5":
                return cardWrap.setAttribute("src", this.state.paySystem.masterCard);
            case "4":
                return cardWrap.setAttribute("src", this.state.paySystem.visa);
            default:
                return cardWrap.setAttribute("src", this.state.paySystem.eror);
        }
    },
    changeColorCard(){
     let cardWrap = document.querySelector(".card__wrap");
     switch (this.state.cardNumber.match(/.{0,4}/g)[0].slice(1)) {
         case "276":
            return cardWrap.style.backgroundColor = this.state.colorBank.sberbank;
         case "200":
            return cardWrap.style.backgroundColor = this.state.colorBank.tinkoff;
         case "203":
            return cardWrap.style.backgroundColor = this.state.colorBank.alpha;
         default:
            return cardWrap.style.backgroundColor = this.state.colorBank.default;
     }
    },
    renderCardNumber(e) {
        e.currentTarget.value = e.currentTarget.value.replace(/[^\d]/g, "");
        if (+e.key / 1 == +e.key || e.key == "Backspace") this.state.cardNumber = e.currentTarget.value;
        if (this.state.cardNumber.length <= 16) document.getElementById("cardNumber").innerHTML = this.sep();
        this.renderPaySystem();
        this.changeColorCard()
    },
    renderCardName(e) {
        e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s]+/g, "");
        this.state.cardName = e.currentTarget.value;
        if (this.state.cardName) {
            document.getElementById("cardName").innerHTML = this.state.cardName;
        } else {
            document.getElementById("cardName").innerHTML = "Имя Фамилия";
        }
    },
    renderCardCW(e) {
        e.currentTarget.value = e.currentTarget.value.replace(/[^\d]/g, "");
        if (+e.key / 1 == +e.key || e.key == "Backspace") this.state.cardCW = e.currentTarget.value;
        if (this.state.cardCW.length <= 3) document.getElementById("cardCW").innerHTML = this.state.cardCW
        this.renderPaySystem();
        this.changeColorCard()
    },
    sep(){
        const sep = (xs, s) => xs.length ? [xs.slice(0, s), ...sep(xs.slice(s), s)] : [];
        return cardNumber = sep([...this.state.cardNumber,"#".repeat(16 - this.state.cardNumber.length),].join(""),4).join(" ");
    },
    renderCardDate(el, tag) {
        document.querySelector(tag).innerHTML = el.currentTarget.value
        this.state[tag.split(" ")[tag.split(" ").length-1].slice(1)] = el.currentTarget.value
    },
    focusCardSide(status){
        const cardWrap = document.querySelector(".card__wrap")
        if(status == "reverse"){
            cardWrap.innerHTML = `
                    <img src=${this.renderPaySystem()} alt="Платёжная система">
                    <h1 id="cardCW">${this.state.cardCW}</h1>
            `
            this.renderPaySystem()
        } else {
            cardWrap.innerHTML = `
                    <img src="" alt="Платёжная система">
                    <h1 class="card__Number" id="cardNumber">${this.sep()}</h1>
                    <div class="other__card__info">
                         <div class="cardName__wrap">
                              <h3>Имя на карте</h3>
                              <h2 id="cardName">${this.state.cardName ? this.state.cardName : "Имя Фамилия"}</h2>
                         </div>
                         <div class="cardData__wrap">
                              <h3>Истекает</h3>
                              <h2><span class="cardMonth">${this.state.cardMonth ? this.state.cardMonth : "Месяц"}</span>/<span class="cardYear">${this.state.cardYear ? this.state.cardYear : "Год"}</span></h2>
                         </div>
                    </div>
            `
            this.renderPaySystem()
        }
    }
};