import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as r}from"./assets/vendor-A92OCY9B.js";const l=`<label>
          Delay (ms)
          <div class="input-wrapper">
            <input type="number" name="delay" required min="0" />
            <span class="arrow-up arrow">
              <svg width="16" height="16">
                <use href="./img/sprite.svg#icon-arrow-up"></use>
              </svg>
            </span>
            <span class="arrow-down arrow">
              <svg width="16" height="16">
                <use href="./img/sprite.svg#icon-arrow-down"></use>
              </svg>
            </span>
          </div>
        </label>

        <fieldset>
          <legend>State</legend>
          <label>
            <input
              type="radio"
              name="state"
              value="fulfilled"
              class="visually-hidden"
              required
            />
            <span class="custom">
              <svg class="icon-custom-rectangle" width="12" height="12">
                <use href="./img/sprite.svg#icon-rectangle"></use>
              </svg>
            </span>
            Fulfilled
          </label>
          <label>
            <input
              type="radio"
              name="state"
              value="rejected"
              class="visually-hidden"
              required
            />
            <span class="custom">
              <svg class="icon-custom-rectangle" width="12" height="12">
                <use href="./img/sprite.svg#icon-rectangle"></use>
              </svg>
            </span>
            Rejected
          </label>
        </fieldset>

        <button type="submit">Create notification</button>`,o={form:document.querySelector(".form")};o.form.innerHTML=l;const i=document.querySelector(".input-wrapper"),c=t=>{const e=t.target.closest(".arrow");if(!e)return;const s=i.querySelector("input");e.classList.contains("arrow-up")&&s.stepUp(),e.classList.contains("arrow-down")&&s.value>0&&s.stepDown()},u=t=>{t.preventDefault();const e=document.querySelector('input[name="delay"]').value,s=document.querySelector('.form input[name="state"]:checked');new Promise((a,n)=>{setTimeout(()=>{s.value==="fulfilled"?a():n()},e)}).then(()=>r.show({backgroundColor:"#59a10d",progressBarColor:"#326101",messageColor:"#fff",position:"topRight",message:`✅ Fulfilled promise in ${e}ms`})).catch(()=>r.show({backgroundColor:"#ef4040",progressBarColor:"#b51b1b",messageColor:"#fff",position:"topRight",message:`❌ Rejected promise in ${e}ms`}))};o.form.addEventListener("submit",u);i.addEventListener("click",c);
//# sourceMappingURL=2-snackbar.js.map
