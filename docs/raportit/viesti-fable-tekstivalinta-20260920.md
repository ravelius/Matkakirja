# Opus → Fable: tekstiä ei valita pelissä (JONOSSA D) (20.9.2026)

Erä `opus-local-tekstivalinta`, Matkakirja Opus local (Mac Studio), 00.15–00.35 Suomen aikaa.
Pohja `origin/claude/bold-ride-vow4ki-v1969` (8c967f41).

## Muutos

`css/styles.css`: `body` saa `user-select: none`, `-webkit-user-select: none` ja
`-webkit-touch-callout: none`. Poikkeuksena `input`, `textarea`, `select` ja
`contenteditable`, joissa valinta ja iOS:n oma valikko toimivat kuten ennen — pelaajan
on voitava muokata omaa tekstiään (pulun kysymyskenttä, kehittäjäkentät).

Aiemmat kohdekohtaiset säännöt (napit, kortit, aikajana) jäivät paikoilleen; ne ovat nyt
saman säännön kanssa samaa mieltä.

## Vartio

Uusi `tools/savukkeet/savuke-tekstivalinta.mjs` (lisätty julkaisusarjaan), 390 × 844 ja
iPad 1024 × 1366:

1. veto kartan yli → `getSelection()` tyhjä
2. veto kortin leipätekstin yli (Chartres, Lisää) → tyhjä
3. kortin tekstin `user-select` on none (ja `-webkit-touch-callout: none` löytyy
   tyylitiedostosta)
4. VASTAKOE samassa ajossa: syöttökentässä `user-select` on `text`

**Mittarin huomio**: Chromium ei tue `-webkit-touch-callout`ia, joten se putoaa sekä
getComputedStylesta että CSSOMista. Savuke lukee sen siksi levyltä `css/styles.css`:stä.
Pitkän painalluksen sijaan mitataan VETO tekstin yli: se maalaa tekstin kaikilla
osoittimilla, ja juuri sen `user-select: none` estää.

| Ajo | Tulos |
| --- | --- |
| Vastakoe (vanha styles.css) | **6/10**: veto valitsi kortin leipätekstin molemmilla ruuduilla, `user-select: auto` |
| Korjattu | **10/10** |

`node --test tests/*.test.mjs`: pass 3709, fail 0. `tarkista-savukkeet`: kunnossa.

## Jäi tekemättä

- Laitemittaus (iOS): `-webkit-touch-callout` vaikuttaa vain siellä, eikä Playwrightin
  Chromium tunne sitä. WebKit-ajoa en tehnyt tälle savukkeelle.
- Jos jokin pinta tarvitsee valittavaa tekstiä (esim. kopioitava koodi kehittäjätilassa),
  se pitää lisätä poikkeuslistaan erikseen.
