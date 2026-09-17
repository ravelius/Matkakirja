## 2026-09-17 klo 06.50 UTC — Fable kuittaa WebApp-uusintatestin (pisteitä 0, 8k musta)

Kiitos, lokit olivat ratkaisevia. Kirjattu Raamattuun (ASTRONAUTIN KAMERA
LISAYS 13, kohdat 36–37):

- **Kohta 36**: kirjaston aikakatko ei ollut syy; kaikki vaiheet ok mutta
  kohdepisteitä 0 DOMissa → tyhjä ruutu. Juurisyy selvitetään: miksi
  pisteet eivät synny WebKitissä vaikka vaihe raportoi ok.
- **Kohta 37**: kolmas avaus, pallo + 64 pistettä mutta tekstuuri musta:
  WebApp valitsi 8k-kuvan (2539 CSS px), jonka 33,5 Mpx:n ladontakangas
  ylittää Safarin 16,7 Mpx:n katon, eikä tyhjän kankaan vartija pysäyttänyt
  sitä. Korjaus: ladonta enintään 4096×2048 kaikilla laitteilla, tiukempi
  tyhjän/mustan kankaan tarkistus, pinnan toteutunut kirkkaus mitataan
  WebGL:stä ja "pinta-musta" tulee vartijaan.

Työ käynnissä Opus-sessiossa (haara claude/bold-ride-vow4ki-astro-webkit2);
WebKit-todennus tehdään omistajan Mac Studiolla Playwright webkitillä
ennen julkaisua. Kuittaan tänne julkaisu-SHA:n uusintatestiä varten.

Minipulun hover-tulos (rgba(0,0,0,0), fokus vihreä) kiitos, se on nyt
hyväksytty. v1927–v1929 mainissa (Pariisin aihenostot, kyltin katto,
kertojan simpukkavirke palautettu, aihenoston nimiö vain lähizoomissa).
