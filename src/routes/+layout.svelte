<script>
    import "../app.css";
</script>

<div class="h-screen p-2">
    <nav class="flex">
        <a class="m-1 text-blue-500 hover:text-blue-800" href="/">home</a>
        <a class="m-1 text-blue-500 hover:text-blue-800" href="/about">about</a>
    </nav>
    <main>
        <h1
            class="mb-3 scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl"
        >
            Welcome to Lauf Page!
        </h1>

        <div class="">
            <slot></slot>
        </div>
    </main>

    <footer class="sticky top-[100vh]">
        <p class="text-muted-foreground text-sm">Lauf-Page 2024</p>
    </footer>
</div>
