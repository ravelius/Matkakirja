# Sisältökirjurin aloitusviesti (24.9.2026 klo 14.5x)

Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri. Ensimmäinen komento:
git fetch origin && git checkout -B sisalto-tyo-$(date +%Y%m%d-%H%M) origin/main. Lue CLAUDE.md,
docs/roolitus.md, Raamatun "TYÖTAPA JA SESSIOT", docs/raportit/sisalto-inventaario-20260924.md (KOKO, kohdat
1-7), ja docs/raportit/viesti-sisaltokirjuri-luovutus-20260924-e.md kokonaan.

TILA: sää-vaihe VALMIS kaikille 71 kaupungille (14 PR:ää auki: #3047-#3050, #3052-#3053, #3056, #3058, #3060,
#3062-#3065). Galleria- ja ennenNyt-tutkimus VALMIS 46/46 mergetylle N8-N16-kaupungille (3 gallerialla, 35
ennenNyt-parilla, PR:t #3066 #3068 #3069). Turistiopas ohitettu toistaiseksi (ei data-poiminta, moni kaupunki
ei sovi konseptiin). Kohdekartat KESKEN, rajattu 12 kaupungin listalle (>10-30 tuhatta asukasta — pienemmät
piirtyvät tyhjiksi, ks. Norfolk-koe).

ENSIMMÄINEN TEHTÄVÄ: jatka kohdekarttoja haarassa sisalto-kohdekartta-pilotti-20260924. Aseta
export CHROMIUM="/Users/koodaus/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
ja aja node tools/piirra-kaupunkikartta.mjs kalgoorlie (rajaus jo tiedostossa). Jos Overpass antaa 504:n,
kokeile OVERPASS_PALVELIMET=https://overpass.kumi.systems/api/interpreter etuliitteenä. Kun kuva on hyvä,
kirjoita js/packs/maakartat.js:n KAUPUNKIKARTAT-riville kalgoorlie (polku, lahde, rajat, esittely, kohteet:
plain teksti-kentällä, EI nosto:-linkillä — luovutuksen kohta 4.1 selittää miksi). Pisteet: Paddy Hannanin
patsas -30.7490175/121.4705657, Hannans North -kaivos -30.7268005/121.4716290. Testaa
tools/tarkista-karttapisteet.mjs, node --test tests/*.test.mjs (0 fail, nostot-kartalla.test.mjs vihreä),
versio+build+commit+PR. Jatka samalla kaavalla 11 muulle kaupungille (Mount Isa, Broome, Geraldton, Porto
Velho, Santarém, João Pessoa, Macapá, Cayenne, Kimberley, Gao, Al Kufra) — 5 kaupunkia/erä. Kirjaa 12
kaupungin lista ja hylkäysperuste 18:lle inventaarioon ENNEN kuin aloitat (kohta 5.5, puuttuu vielä). Kun
kohdekartat on tehty: N2/N4/N5/N6:n 20 kaupungin sää/galleria/ennenNyt kun ne mergetään, sekä Churchill-nosto
(#3016 on mergetty).

npm ci on ajettu tässä checkoutissa (node_modules on olemassa) — ei tarvitse ajaa uudelleen paitsi
package-lock.json muuttuu. Agentit vain Sonnet/Opus, enintään 4 rinnakkain. Kontekstin nollaus: kun Fable
pyytää, kirjoita luovutus ja kutsu clear_session self samassa vuorossa. Viestit Fablelle vain PR-numero
valmiista erästä, jumi tai kysymys, enintään 8 riviä. Testit ilman ääniä. Aikaleimat date-komennolla.
