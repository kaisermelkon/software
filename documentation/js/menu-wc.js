'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">metro-uber documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-44ae1667725a79e59879929f3592cc91"' : 'data-target="#xs-components-links-module-AppModule-44ae1667725a79e59879929f3592cc91"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-44ae1667725a79e59879929f3592cc91"' :
                                            'id="xs-components-links-module-AppModule-44ae1667725a79e59879929f3592cc91"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GrupoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GrupoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InicioComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InicioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InvitacionesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InvitacionesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PerfilComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PerfilComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegistroComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegistroComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-44ae1667725a79e59879929f3592cc91"' : 'data-target="#xs-injectables-links-module-AppModule-44ae1667725a79e59879929f3592cc91"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-44ae1667725a79e59879929f3592cc91"' :
                                        'id="xs-injectables-links-module-AppModule-44ae1667725a79e59879929f3592cc91"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CarroService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>CarroService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DireccionService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DireccionService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GrupoService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GrupoService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/InvitacionService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>InvitacionService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PertenecesService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PertenecesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsuarioService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UsuarioService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/baseRoutes.html" data-type="entity-link">baseRoutes</a>
                            </li>
                            <li class="link">
                                <a href="classes/Carro.html" data-type="entity-link">Carro</a>
                            </li>
                            <li class="link">
                                <a href="classes/CarroController.html" data-type="entity-link">CarroController</a>
                            </li>
                            <li class="link">
                                <a href="classes/CarroRoutes.html" data-type="entity-link">CarroRoutes</a>
                            </li>
                            <li class="link">
                                <a href="classes/Direccion.html" data-type="entity-link">Direccion</a>
                            </li>
                            <li class="link">
                                <a href="classes/DireccionController.html" data-type="entity-link">DireccionController</a>
                            </li>
                            <li class="link">
                                <a href="classes/DireccionRoutes.html" data-type="entity-link">DireccionRoutes</a>
                            </li>
                            <li class="link">
                                <a href="classes/groupRoutes.html" data-type="entity-link">groupRoutes</a>
                            </li>
                            <li class="link">
                                <a href="classes/Grupo.html" data-type="entity-link">Grupo</a>
                            </li>
                            <li class="link">
                                <a href="classes/GruposController.html" data-type="entity-link">GruposController</a>
                            </li>
                            <li class="link">
                                <a href="classes/Invitacion.html" data-type="entity-link">Invitacion</a>
                            </li>
                            <li class="link">
                                <a href="classes/InvitacionController.html" data-type="entity-link">InvitacionController</a>
                            </li>
                            <li class="link">
                                <a href="classes/InvitacionRoutes.html" data-type="entity-link">InvitacionRoutes</a>
                            </li>
                            <li class="link">
                                <a href="classes/Perteneces.html" data-type="entity-link">Perteneces</a>
                            </li>
                            <li class="link">
                                <a href="classes/PertenecesController.html" data-type="entity-link">PertenecesController</a>
                            </li>
                            <li class="link">
                                <a href="classes/PertenecesRoutes.html" data-type="entity-link">PertenecesRoutes</a>
                            </li>
                            <li class="link">
                                <a href="classes/Server.html" data-type="entity-link">Server</a>
                            </li>
                            <li class="link">
                                <a href="classes/Solicitud.html" data-type="entity-link">Solicitud</a>
                            </li>
                            <li class="link">
                                <a href="classes/Usuario.html" data-type="entity-link">Usuario</a>
                            </li>
                            <li class="link">
                                <a href="classes/usuarioController.html" data-type="entity-link">usuarioController</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CarroService.html" data-type="entity-link">CarroService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DireccionService.html" data-type="entity-link">DireccionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GrupoService.html" data-type="entity-link">GrupoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InvitacionService.html" data-type="entity-link">InvitacionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PertenecesService.html" data-type="entity-link">PertenecesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsuarioService.html" data-type="entity-link">UsuarioService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuardService.html" data-type="entity-link">AuthGuardService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});