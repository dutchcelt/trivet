export default `

<div class="menu">
	
    <nav v-bind:class="active" v-on:click.prevent>
        <a href="#" v-for="page in pages" v-on:click="makeActive(page, $event)" v-bind:class="page.name.toLowerCase()">
           {{page.name}}
        </a>
    </nav>
    <p>You chose <b>{{active}}</b></p>
	<p>{{ message }}</p>
</div>
`;


