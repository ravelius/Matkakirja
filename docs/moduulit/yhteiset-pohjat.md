# Yhteiset pohjat: liike, ääni ja valo

Omistajan päätös 16.10.2026 klo 20.54 (kortti "Kyllä, kaikki yhtä aikaa"). Linjaus: Raamattu,
UI-POHJAT JA TYYLIMÄÄRITTELYT → YHTEISET POHJAT. Tämä sivu kertoo omistajat ja tilan.

Periaate: kuten lasipohja (tyylikirja.json → Tyylikirja.cs/.uss, Pohja.cs, Lasipohja), myös liike,
ääni ja valo tulevat yhdestä paikasta. Uusi linssi tai peli käyttää vain pohjia. Parannus tehdään
pohjaan, ei yksittäiseen linssiin, ja se leviää kaikkiin valmiisiin linsseihin ja peleihin.
Väliaikaisia paikallisia korjauksia ei tehdä.

| Pohja | Sisältö | Omistaja | Ensimmäinen käyttäjä |
|---|---|---|---|
| LIIKE | Nimetyt liikkeet: kävely, liuku, suurennus, katseen käännös, kortin avaus ja sulku. Pehmeä alku ja loppu (ease in/out). Kesto ja käyrä tyylikirjassa Keston vieressä. Pohjana pallokameran IKamera.Aja + siirtoajon pehmennys. | Pelikoodari (pohja), Natiivi-UI (tyylikirjan osa, korttien avaus ja sulku) | Museon kävely ja auto zoom (ensin koko teos ja nimi, sitten liuku lähemmäs) |
| ÄÄNI | Yhteinen mikseri: puhe, musiikki, tehosteet, maisema. Tasot, pehmeät häivytykset, musiikin vaimennus kertojan alle, askeleet alustan mukaan. Jaetun mikserin kertoimet (worker /mikseri/tasot) säilyvät. | Siirtoseppä (koodi), Äänittäjä (tasot ja kuuntelu); suunnitelma docs/moduulit/aanipohja.md (koodimikseri säilyy, AudioMixer liitetään vain tarvittaessa) | Museo: askeleet, kertoja, sellot |
| VALO JA KUVA | Yhteiset valaistus-, varjo-, sävykäsittely- ja materiaaliprofiilit, joista linssit ja pelit valitsevat. | Valoseppä | Valosepän suunnitelman mukaan |

## Välineet (Keskustelukanavan lisäys 16.10.2026; kaikki ilmaisia tai jo projektissa, ei ostoja)

- LIIKE: liikemerkit (nimi + käyrä + kesto) tyylikirjaan Material 3:n ja SwiftUI:n mallin mukaan;
  UI:ssa USS-transitiot samoilla arvoilla. 3D-kamerat Cinemachinen kautta (com.unity.cinemachine
  6.7.0 ja splines 2.9.1 jo asennettu; nyt käytössä vain DioraamaCinemachine.cs:ssä ja
  Seikkailu*-tiedostoissa), yksi yhteinen blend-asetus.
- ÄÄNI: yksi Unityn AudioMixer (ryhmät, Duck Volume, snapshotit) ja jo asennettu Steam Audio.
- VALO: yksi URP Volume -oletusprofiili, materiaalivariantit, prefab-variantit ja Preset Managerin
  tuontioletukset.
- VALVONTA: Roslyn-analysaattori tai EditMode-testi varoittaa ohituksista; pohjan muutoksille
  vertailukuvat; yksi näyttelynäkymä, jossa kaikki liikkeet, kortit ja äänet näkyvät ja kuuluvat.

## Tarkistus

Jokaisella pohjalla on automaattinen tarkistus. Se listaa pohjan ohittavat omat liikkeet (Lerp,
omat pehmennykset), omat AudioSourcet ja omat valot ja värit. Nykyiset ohitukset ovat lähtötasona
siirtolistalla, ja määrä saa vain pienentyä (sama malli kuin pohjavahdissa).

## Lähtötilanne 16.10.2026 (Keskustelukanavan kartoitus)

- Liike: pehmennys on tehty erikseen noin 90 tiedostossa (Linssit/Unity 40, Linssit/Ydin 17,
  UI/Linssit 8 …). Museolla on omat Lerpit (MuseoKierros).
- Ääni: AudioMixeriä ei ole. 31 linssitiedostoa luo omat AudioSourcet.
- Valo: Valoseppä kartoittaa.

## Siirtojärjestys

Ensin pohja ja ensimmäinen käyttäjä, sitten vanhat linssit ja pelit vuorollaan, kun niihin muutenkin
koskee. Omistaja näkee videon ennen ja jälkeen ensimmäisestä käyttäjästä.
