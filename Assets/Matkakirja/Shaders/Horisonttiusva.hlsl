// Horisonttiusva varjostimille (omistajan löydökset 153 ja 159, build 20): sama ruudun usva kuin UI-merkeillä
// (Horisonttiusva.Peitto, webin paperiusva) niille 3D-kerroksille, joita natiivin sumu ei koske (Overlay-, viiva- ja
// kynävarjostimet). Aurinko kirjoittaa globaalin _UsvaRuutu = (raja osuutena ylhäältä, voima 0–1, liuku, 0) vain
// muuttuessa; voima 0 = ei usvaa (lento, kallistamaton kartta, linssin oma tausta).
//
// Käyttö: #include "Assets/Matkakirja/Shaders/Horisonttiusva.hlsl"
//   kärjessä:   o.usvaY = UsvaYlhaalta(o.positionCS);        // TransformObjectToHClip-tulos
//   pikselissä: alfa *= UsvaNakyvyys(i.usvaY);
#ifndef MATKAKIRJA_HORISONTTIUSVA_INCLUDED
#define MATKAKIRJA_HORISONTTIUSVA_INCLUDED

float4 _UsvaRuutu;

// Kärjen paikka ruudun korkeuden osuutena ylhäältä (0 yläreuna, 1 alareuna). _ProjectionParams.x kumoaa URP:n
// y-käännön välitekstuuriin piirrettäessä.
float UsvaYlhaalta(float4 positionCS)
{
    return 0.5 - 0.5 * (positionCS.y / max(positionCS.w, 1e-6)) * _ProjectionParams.x;
}

// Näkyvä osuus 1 − peitto: peitto = voima rajan yläpuolella, lineaarisesti nollaan liu'un matkalla rajan alla.
half UsvaNakyvyys(float yYlhaalta)
{
    float raja = _UsvaRuutu.x, voima = _UsvaRuutu.y, liuku = max(_UsvaRuutu.z, 1e-3);
    float peitto = voima * (1.0 - saturate((yYlhaalta - raja) / liuku));
    return (half)(1.0 - peitto);
}

#endif
