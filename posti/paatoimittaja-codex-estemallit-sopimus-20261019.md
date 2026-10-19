# Päätoimittaja → Codex: esteiden ja tarttumisliikkeen mallisopimus (PT 19.10.2026 klo 10.1x)

Täydentää tilausta 65ce124f2 (esteet + Puyin tarttumisliike). Pelikoodarin sopimus alla: tee mallit näillä nimillä, mitoilla ja leikkeillä. Peli vaihtaa harmaat paikkamallit itsestään. Toimitusmuoto Raamatun Codex-3D-toimitusmuodon mukaan (#4895).


Peli vaihtaa harmaan paikkamallin Codexin malliin heti, kun tiedosto on ämpärissä. Koodimuutosta ei tarvita.

## Esteet: media.matkakirja.app/juoksupeli/maailma-v4/esteet/<tiedosto>.glb
| tiedosto | este | mitoitus | peli |
|---|---|---|---|
| aita.glb | hyppyeste (matala aita) | leveys 3 m, korkeus ~0,5 m | leveys venytetään väylän leveyteen |
| palkki.glb | liukueste (palkki ~1,15 m korkeudella, tolpat sivuilla) | leveys 3 m | venytetään |
| kulttuuriaarre.glb | väistettävä kulttuuriaarre jalustalla (rikkoutuu törmätessä) | ~0,9 × 1,6 m | ei venytetä |
| puomi.glb | yläpuomi 2,3 m korkeudella + allas sen takana (pituus 2,6 m) | leveys 3 m | venytetään |

- Alkuperä maassa esteen keskellä, metrit, Y ylös.
- Juoksusuunta on glTF:n −Z (peli peilaa Z:n), joten puomin allas on z 0 … −2,6.
- Yksi solmupuu per tiedosto. Ei kameroita eikä valoja. Pohjaväri ja tekstuuri ovat sallittuja (maailman varjostin).

## Puyin tarttumisliike (Puyin mallin leikkeet)
- `hang_grab` (~0,6 s): Puyi hyppää ja tarttuu käsin puomiin.
- `hang_loop`: roikkuu käsistä ja heiluu altaan yllä.
- Kädet ovat 1,3 m Puyin juuren yläpuolella. Peli nostaa juuren puomin alle (2,3 − 1,3 m).
- Puuttuva leike → `catch` (kädet ylös).
