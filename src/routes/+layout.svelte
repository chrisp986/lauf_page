<script>
    import "../app.css";
</script>

<header
    class="bg-gray-100 sticky top-0 z-10 p-2 px-3 drop-shadow content-center"
>
    <nav class="flex flex-row justify-end space-x-1 md:flex md:flex-grow">
        <a class="m-1 text-gray-800" href="/">home</a>
        <a class="m-1 text-gray-800" href="/about">about</a>
    </nav>
    <h1
        class="flex ml-1 scroll-m-20 text-2xl lg:text-4xl underline text-gray-800 font-extrabold tracking-tight"
    >
        Lauf-Page!
    </h1>
</header>
<main class="mx-auto mt-6 px-5">
    <slot></slot>
</main>

<footer class="sticky top-[100vh] bg-gray-800 text-white mt-12 py-6">
    <div class="mx-auto text-center">
        <p class="text-sm">Lauf-Page 2024</p>
    </div>
</footer>
