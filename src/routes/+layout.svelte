<script>
    import "../app.css";
</script>

<header class="bg-gray-100 sticky top-0 z-10 p-2 drop-shadow">
    <nav class="flex md:flex md:flex-grow flex-row justify-end space-x-1">
        <a class="m-1 text-gray-800" href="/">home</a>
        <a class="m-1 text-gray-800" href="/about">about</a>
    </nav>
    <h1
        class="ml-1 scroll-m-20 text-2xl underline text-gray-800 font-extrabold tracking-tight lg:text-4xl"
    >
        Lauf-Page!
    </h1>
</header>
<main class="container mx-auto mt-6 px-3">
    <slot></slot>
</main>

<footer class="sticky top-[100vh] bg-gray-800 text-white mt-12 py-6">
    <div class="container mx-auto px-4 text-center">
        <p class="text-sm">Lauf-Page 2024</p>
    </div>
</footer>
