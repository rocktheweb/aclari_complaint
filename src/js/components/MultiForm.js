import $ from 'jquery';

import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/tab';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/modal';

import mediaQuery from '../utils/mediaQuery';

function MultiForm(selector) {

    const CLASS_NAME_LINK = '.multiform-nav__link';
    
    const _FORM = new WeakMap();

    class MultiForm {
    
        constructor(selector) {
    
            _FORM.set(this, {
                form: selector,
            });

            this._setLinks();
            this._setTabs();
            
            this.isDesktop = false;

            this.view = new mediaQuery('(min-width:992px)', {
                
                success: () => {

                    if (this.isDesktop) return;
                    
                    this.setDesktopView();
                    this.isDesktop = true;

                },

                failure: () => {

                    if (!this.isDesktop) return;

                    this.setMobileView();
                    this.isDesktop = false;
                }

            });

            $(selector).on('shown.bs.collapse', (e) => {
                this._getCurrentIndex();
            });
            
            this.length;
            this.currentIndex = this._getCurrentIndex();

            this.nextBtn = selector.querySelector('#multiform-next-btn');
            this.prevBtn = selector.querySelector('#multiform-prev-btn');

            this.nextBtn.addEventListener('click', () => {
                if (this.currentIndex + 1 > this.length - 1) {
                    $('#exampleModalCenter').modal('show');
                } else {
                    this.showTab(++this.currentIndex);
                }
    
            });

            this.prevBtn.addEventListener('click', () => {
                if (this.currentIndex - 1 < 0) {
                    alert('Powrót');
                } else {
                    this.showTab(--this.currentIndex);
                }
            });

        }
        
        _setLinks() {
            
            const { form } = this.get();
            
            const links = [...form.querySelectorAll(CLASS_NAME_LINK)];
            
            this.length = links.length;

            links.forEach(link => {
                $(link).on('shown.bs.tab', () => {
                    this.currentIndex = this._getCurrentIndex();
                });
            });

            _FORM.set(this, {...this.get(), links});
        }

        _setTabs() {
            const { links } = this.get();
            let tabs = [];
            links.forEach(link => {
                let target = document.querySelector(link.dataset.target);
                if ( !target ) throw new Error('Cannot find target tab');
                tabs.push(target);
            });
            _FORM.set(this, {...this.get(), tabs});
        }

        _getCurrentIndex() {

            const { links } = this.get();
            
            if (this.isDesktop) {

                return links.findIndex(link => link.classList.contains('active'));
                // this.currentIndex = links.findIndex(link => link.classList.contains('active'));

            } else {
                return links.findIndex(link => !link.classList.contains('collapsed'));
                // this.currentIndex = links.findIndex(link => !link.classList.contains('collapsed'));
            
            }

        }

        get() {
            return _FORM.get(this);
        }
        
        showTab(index) {
            
            const { links, tabs } = this.get();

            if (this.isDesktop) {
                $(links[index]).tab('show');
            } else {
                $(tabs[index]).collapse('show');
            }
        }

        setDesktopView() {
            
            const { form, links, tabs } = this.get();
            
            const multiFormContent = document.createElement('div');

            multiFormContent.classList.add('multiform-content', 'tab-content');

            links.forEach(link => {

                let active = link.getAttribute('aria-expanded') === 'true' && !link.classList.contains('collapsed');

                link.dataset.toggle = 'tab';

                link.removeAttribute('aria-expanded');
                link.setAttribute('aria-selected', (active) ? true : false );

                if (active) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('collapsed');
                }
            });

            tabs.forEach(tab => {

                let active = tab.classList.contains('show');
                
                if (active) {
                    tab.classList.add('active')
                }

                tab.classList.remove('collapse');
                tab.classList.add('tab-pane', 'fade');
            
                tab.removeAttribute('data-parent');
                tab.setAttribute('role', 'tabpanel');

                multiFormContent.appendChild(tab);
            });

            form.querySelector('form').appendChild(multiFormContent);

        }

        setMobileView() {
            const { form, links, tabs } = this.get();
            
            const multiFormContent = document.querySelector('.multiform-content');
            
            tabs.forEach(tab => {

                let active = tab.classList.contains('active');

                tab.setAttribute('data-parent', `#${form.id}`);
                tab.removeAttribute('role');
                
                if (active) {
                    tab.classList.remove('active');
                }

                tab.classList.remove('tab-pane', 'fade');
                tab.classList.add('collapse');

            });

            links.forEach(link => {

                let active = link.getAttribute('aria-selected') === 'true' && link.classList.contains('active');
            
                let [ target ] = tabs.filter(tab => tab.id === link.dataset.target.slice(1));
                
                link.dataset.toggle = 'collapse';
                
                link.removeAttribute('aria-selected');
                link.setAttribute('aria-expanded', (active) ? true : false );
                
                if (active) {
                    link.classList.remove('active');
                } else {
                    link.classList.add('collapsed');
                }
                
                link.parentElement.appendChild(target); 

                multiFormContent.remove();

            });

        }
        
        static create(selector) {
            return new MultiForm(selector);
        }

    }

    if (typeof selector === 'string') {

        let form = document.querySelector(selector);

        if (!form) throw new Error('Cannot find HTML Element');

        return MultiForm.create(form);

    } else if (typeof selector === 'object' && selector instanceof Element) {

        return MultiForm.create(selector);

    }
}



export default MultiForm;