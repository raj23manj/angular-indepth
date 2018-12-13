# Angular 5/6/7

# CLI Commands

# Install Commands

    * sudo npm i -g @angular/cli@latest
    * npm i --save package  => to save as a production dependency

# Generation commands

    * ng new my-new-app
    * ng g c my-component / ng generate component parent-folder/my-component

# Running App

    * ng serve => localhost:4200/

# Setting Up Bootstrap

    - https://www.udemy.com/the-complete-guide-to-angular-2/learn/v4/t/lecture/9118764?start=0

# TypeScript

    - https://www.typescriptlang.org/docs/handbook/basic-types.html

# Angular Start up steps

    1. main.ts gets loaded
    2. platformBrowserDynamic().bootstrapModule(AppModule) in main.ts gets loaded
    3. src/app.module gets loaded and all related files to it.

# Decorators

    - @Component, @Directive, @Input, @Output, @ViewChild, @ContentChild

# Components

    - @Component({selector, templateUrl/template, styleUrls, encapsulation})
    - need to add under "declarations" section of the parent component
    - multiple way's to use selector's instead of <app-root></app-root>, <div app-root> </div>, <div class="app-root"> Section 2, 21 lecture
    - All properties inside a component are accessible only inside it
    - LifeCycle Hooks (Section 5, 72), we have seperate hooks for views and contents(ng-content)
        - constructor() {
            1st
            console.log('constructor called');
        }

       -  ngOnChanges(changes: SimpleChange){
            // only one hook to get an argument
            // element is this input element
            //console.log(changes);
            console.log('ngOnChanges called');
        }

       -  ngOnInit() {
           2nd
            console.log('ngOnInit called');
        }

        - ngDoCheck() {
            // for any change detection
            console.log('ngDoCheck called');
        }

        - ngAfterContentInit() {
            // runs when the ng-content is used and the content from parent is inserted into
            console.log('ngAfterContentInit called');
        }

        - ngAfterContentChecked() {
            // gets call after change detection
            console.log('ngAAfterContentChecked called');
        }

        - ngAfterViewInit() {
            // something like dom ready, once all elements loaded then we can access
            // can access all properties after intialized
            console.log('AfterViewInit called');
        }

        - ngAfterViewChecked() {
            // after the content is checked
            console.log('ngAfterViewChecked called');
        }

        - ngOnDestroy() {
            // called when component destroyed
            console.log('ngOnDestroy called');
        }

# Templates

    - methods also can be called in templates => {{ getMethodName() }}
    - {{ allowServer }} => <p [innerText]="allowServer"></p> setting the innerText property

# Local References From Templates And Projecting Content

    - Using Local Reference without using @ViewChild
        - In Template
            - <input type="text" class="form-control" #serverNameInput>
            - <button class="btn btn-primary" (click)="onAddServer(serverNameInput)">Add Server</button>
        - In Component
            - onAddServer(serverNameInput: HTMLInputElement) {console.log(serverNameInput);}

        - In Template Using @ViewChild
            <input type="text" class="form-control" #serverContentInput>
        - In Component
            - @ViewChild('serverContentInput') serverContentInput: ElementRef;
            - this.serverContentInput.nativeElement.value;

        - Get hold of child component
            - @ViewChild(CustomerFormComponent) child: CustomerFormComponent;
            - https://github.com/raj23manj/customer-manager/blob/680ba717dd1825c3db03b5a89a79c80e3da02c3e/src/app/customers/customers.component.ts

    - Passing Code from parent compontent to child like ember yield or Projecting Contents into Components with ng-content
        - In Parent Template
            - <app-server-element *ngFor="let serverElement of serverElements"
                          [srvElement]="serverElement">
                    <p>
                    <strong *ngIf="serverElement.type === 'server'" style="color: red">{{ serverElement.content }}</strong>
                    <em *ngIf="serverElement.type === 'blueprint'">{{ serverElement.content }}</em>
                    </p>
             </app-server-element>
        - In Child component
            - <div class="panel-body">
                <ng-content></ng-content>
              </div>

    - Access ng-content elements using  @ContentChild (Section 5)
        - In Parent Template
            - <app-server-element
                *ngFor="let serverElement of serverElements"
                [srvElement]="serverElement"
                [name]="serverElement.name">
                <p #contentParagraph> =>
                <strong *ngIf="serverElement.type === 'server'" style="color: red">{{ serverElement.content }}</strong>
                <em *ngIf="serverElement.type === 'blueprint'">{{ serverElement.content }}</em>
                </p>
             </app-server-element>

        - In Child Component
            - @ContentChild('contentParagraph') paragraph: ElementRef;

# String Interpolation

    - assiging value from component property to template
    - <p [innerText]="allowServer"></p>
    - [property] = "data" => <button [disabled]="allowServer">
    - {{ getMethodName() }}
    - {{ allowServer }}

# Binding(Data/property/Events)

    - One Way
        - from component to template
            - String interpolation {{ data }}
            - Property Binding [property] = "data" => <button [disabled]="allowServer">, in component => allowServer: boolean = true
            -  <img  [src]="recipe.imagePath" alt="{{ recipe.name }}"> => propery binding
            -  <img  src= {{recipe.imagePath}} alt="{{ recipe.name }}">

        - from template to component
            - Event Binding (event) = "expression" => (click) = "method()"

    - Two way Binding
        - [(ngModel)] = "data"
        - to enable two-way binding => https://www.udemy.com/the-complete-guide-to-angular-2/learn/v4/t/lecture/6655876?start=0

    - In Components
        - @Output()
            - In Parent Template
                - <app-cockpit (serverCreated)="onServerAdded($event)" (bpCreated)="onBlueprintAdded($event)"
    ></app-cockpit>
            - In Child Component
                - without Alias => @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
                - with Alias => @Output('bpCreated') bluePrintCreated = new EventEmitter<{serverName: string, serverContent: string}>();

        - @Input()
            - In Parent Template using alias
                - <app-server-element *ngFor="let serverElement of serverElements" [srvElement]="serverElement">
            - In Child Component
                - @Input('srvElement') element: {type: string, name: string, content: string};

            - In Parent Template without alias
                - <app-server-element *ngFor="let serverElement of serverElements" [element]="serverElement">
            - In Child Component
                - @Input() element: {type: string, name: string, content: string};

# Events

    - https://www.udemy.com/the-complete-guide-to-angular-2/learn/v4/t/lecture/6655990?start=0
    - onClick => (click) = "method()", (input) = "method()"
    - passing data emmited by the event using $event => (click) = "method($event)" (28, section 2)
    - in component method(event: Event) { (<HTMLInputElement>event.target).value }

# Directives

    - Instructions in the DOM
    - Components are directives with a template

    - Inbuilt Directive's
        - Structural Directive -> it changes the dom
            - *ngIf => <p *ngIf="component-property/method()/inline statement"> (ifelse section 2, 34)
            - *ngFor => <app-server *ngFor="let server of servers"></app-server>
            - *ngFor with index => <li *ngFor="let detail of details; let i = index">

        - Attribute Directives => only change the element they were placed on
            - ngStyle => <p [ngStyle]="{'backgroundColor': getColor()}">
            - ngClass => <p [ngStyle]="{'backgroundColor': getColor()}"
                            [ngClass]="{online: serverStatus === 'online'}"  > (online will be the class)

    - Custom Directive
        - @Directive({selector})

# Creating Model File (our Convinence)

    - Blueprint for objects we create
    - export class Ingredient {
        constructor(public name: string, public amount: number){
            }
        }
    - export class Ingredient {
        public name: String,
        public amount: number,

        constructor(name: string, amount: number){
              this.name = name;
              this.amount = amount;
            }
        }

# View Encapsulation

    - Section 5, 67
    - css rules in each component is restricted to that component only
    - Angular creates and forces style encapsulation, by creating a unique attribute name. This is the default behaviour
    - Emulates shadow dom
    - Values
      - ViewEncapsulation.None => remove default behaviour, so add css in one component it affects in other componentes
      - ViewEncapsulation.Native => supports shadow dom, but only few browsers support it
      - ViewEncapsulation.Emulated => default

# CookBook

    - Images
        -  <img  [src]="recipe.imagePath" alt="{{ recipe.name }}"> => propery binding
        -  <img  src= {{recipe.imagePath}} alt="{{ recipe.name }}">
    - To Get the types of the elements of templates, use console.log in the component
        - onAddServer(serverNameInput: HTMLInputElement) { console.log(serverNameInput); }

# Debugging

    - Section 4
