<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import './index.css'
</script>

<template>

  <header>
    
    <div class="wrapper">
      <HelloWorld msg="Bem-vindo(a)! Escolha uma variável meteorológica para analisar:" />
      <nav>
        <RouterLink  to="/">Temperatura</RouterLink>
        <RouterLink  to="/wind">Vento</RouterLink>
      </nav>
    </div>

  </header>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-button-text);
  background-color: var(--color-button);
  border-radius: 8px;
  padding: 8px 20px;
}

nav a.router-link-exact-active:hover {
  background-color: var(--color-button-hover);
  color: var(--color-button-text);
}

nav a {
  display: inline-block;
  padding: 1rem;
  border-left: 1px solid 
}



@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }


  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
