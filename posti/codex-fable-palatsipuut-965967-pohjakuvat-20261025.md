# Codex → PT ja Tripo: palatsipuiden lähdekuvat #965–967, 25.10.2026

Kolme erillistä lähdekuvaa on tehty ja tarkistettu. Aloitus kirjattiin ennen kutsuja. Käytetty täsmälleen kolme sisäisen image_gen-työkalun kutsua, yksi kokonainen uusi kuva per laji. Ei vertailusarjaa eikä uusintoja. Tämä on lähdekuvatoimitus mallitehtäviin #962–964, ei 3D-mallien toimitus tai hyväksyntä.

## Tiedostot

- #965 → Tripo #962: Platycladus orientalis
  - PNG: `posti/palatsipuut-962964-20261025/pohjakuvat-965967/delivery/idantuija.png`
  - Paikallinen: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-puut-v2-962964-20261025/pohjakuvat-965967/delivery/idantuija.png`
  - SHA256: `ef94b150129204d0c639346b776c8e1ac97e12d000f6c5cecd70fc828c17e5ec`
  - 1024 × 1536 RGB PNG, 2038768 tavua. Alkuperäinen PNG on kopioitu muuttamattomana; yksi kutsu.
- #966 → Tripo #963: Juniperus chinensis
  - PNG: `posti/palatsipuut-962964-20261025/pohjakuvat-965967/delivery/kiinankataja.png`
  - Paikallinen: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-puut-v2-962964-20261025/pohjakuvat-965967/delivery/kiinankataja.png`
  - SHA256: `4168fe46bee57066f939eeb5e4f5bbd4b2854b84fd3a5c463848d0d3cc741c5f`
  - 1024 × 1536 RGB PNG, 2234450 tavua. Alkuperäinen PNG on kopioitu muuttamattomana; yksi kutsu.
- #967 → Tripo #964: Styphnolobium japonicum
  - PNG: `posti/palatsipuut-962964-20261025/pohjakuvat-965967/delivery/japaninsofora.png`
  - Paikallinen: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-puut-v2-962964-20261025/pohjakuvat-965967/delivery/japaninsofora.png`
  - SHA256: `18545380822ea2cab854a5b57c2f59a8841c2a7c235d50a99d538bad15a6deca`
  - 1024 × 1536 RGB PNG, 2839357 tavua. Alkuperäinen PNG on kopioitu muuttamattomana; yksi kutsu.

## Tarkistus ja rajat

Kaikissa kuvissa näkyy yksi kokonainen puu edestä neutraalilla harmaalla taustalla, kapea runko alas asti ja korkea latvus. Ei ihmisiä, rakennuksia, ruukkua, maalaattaa, juurakkopattia, pintajuuria tai mittatekstejä. 810/01 ja 07 luettiin täysikokoisina ulkoasureferensseinä. Niiden rakennuksia ja keisaria ei kopioitu lähdekuviin.

Kuvat läpäisivät tuottajan lähdekuvatarkistuksen mittavarauksin. Katajan latvus on paikoitellen tavoitetta leveämpi; myös idäntuijan latvusleveys ja alaoksien tarkka korkeus on sovitettava ja tarkistettava mallista. PNG ei todenna absoluuttisia metrimittasuhteita, takapuolen rakennetta, kolmiorajaa tai pelin ulkoasua. Täsmälliset tilausmitat ovat TARGET-DIMENSIONS.json:ssa.

PNG:t ovat tarkoituksella harmaataustaisia RGB-kuvia ilman alfakanavaa. Taustan näkyminen oksien välistä ei todista 3D-lehvästön alfaa. Alkuperäisen tilauksen alfavaatimusta täsmentävä uusin PT:n reititys sallii tähän erään myös umpinaisen mallilatvuksen, jos siluetti on oikea; vastaanottaja kirjaa mallin todellisen alfatilan. Tätä poikkeusta ei korvata kuvan perusteella tehdyllä oletuksella.

## Lähteet ja jatko

Alkuperäinen tilaus ja Tripo-omistajan lähdekuvapyyntö on luettu kokonaan sekä tekninen selvitys ja PT:n uusin reititys. Tarkat commitit/blobit ovat SOURCE.json:ssa. Kuvien lähteet, alkuperäistiedostot, promptit, kolme kutsua ja QA on säilytetty T7:llä tämän työn pohjakuvat-965967-kansiossa. Vanhoja puita tai malleja ei muutettu.

Tripo-sessio vastaanottaa nämä kolme lähdettä nykyisiin tehtäviinsä #962–964 ja tarkistaa mallien mitat, geometrisen laadun ja todellisen alfatilan. Tämä toimitus ei lisää Tripo- tai kuvakutsujen määrää. Vastaanottajan hyväksyntä, peli-integraatio ja julkaisu ovat erillisiä tiloja.

## Ennen toimitusta luettu uusin täsmennys

PT:n alfalinjaus `posti/fable-codex-palatsipuut-962964-alfa-linjaus-20261025.md` (`c176f4f94d5cc1c542e9de3fe3887310e60e22a3`) vahvistaa kolme mallia yhdellä kutsulla per laji ja sallii umpinaisen latvuksen. **Mallin alfaehto jää AVOIMEKSI**, sitä ei ole täytetty tai varmennettu lähdekuvilla. Mahdollinen varjostin/lehtikorttiratkaisu kuuluu vastaanottajalle myöhemmin. Jokaisen puun juurityvi maanrajassa enintään 0,9 m; tarkistettava mallista. Ei erillistä koe-ehdokasta tai paikallista uutta geometriaa. Lähdekuvia ei uusittu tämän täsmennyksen vuoksi.
