Reveal.initialize({
	controls: true,
	progress: true,
	history: true,
	center: true,

	transition: 'fade', // none/fade/slide/convex/concave/zoom

	// Optional reveal.js plugins
	dependencies: [
		{ src: '../js/vendor/classList.js', condition: function() { return !document.body.classList; } },
		{ src: '../js/vendor/highlight/highlight.js', async: true, condition: function() { return !!document.querySelector( 'pre code' ); }, callback: function() { hljs.initHighlightingOnLoad(); } },
    // Interpret Markdown in <section> elements
    { src: '../js/vendor/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: '../js/vendor/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
		{ src: '../js/vendor/notes/notes.js', async: true }
	]
});

/*
Reveal.addEventListener('slidechanged', function(event) {               
});
*/
