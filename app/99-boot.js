/* Arranque del portal: va el último para que todos los módulos de app/ estén declarados. */
// Otro colegio espera su marca y sus apps (school.js); NIS arranca al instante.
(window.NIS_SCHOOL_READY || Promise.resolve()).then(init);
