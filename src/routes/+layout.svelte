<script>
    import "../app.css";
</script>

<div class="h-screen p-2">
    <nav>
        <a href="/">home</a>
        <a href="/about">about</a>
    </nav>
    <main>
        <h1
            class="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl"
        >
            Welcome to Lauf Page!
        </h1>
        <div class="grid grid-cols-4 auto-cols-max">
            <slot></slot>
        </div>
    </main>

    <footer class="sticky top-[100vh]">
        <p class="text-muted-foreground text-sm">Lauf-Page 2024</p>
    </footer>
</div>
