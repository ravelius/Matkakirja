# ISS-ympyräikkuna #435 — tekninen QA HYLÄTTY

Yksi sallittu sisäisen image_genin kutsu tehtiin. Kuva syntyi ja natiivi säilytettiin muuttamatta. **Tämä tiedosto ei ole sellaisenaan pelivalmis kehys.** Ei uusintaa, skaalausta tai alfa-/pikselikorjausta.

- Natiivi on **1024 × 1536 RGBA** (2:3), pyydetty **1536 × 2304** ei toteutunut.
- Alfa-alue on **0–254**. Täysin peittäviä alfa255-pikseleitä on **0**. Kehys ja seinä ovat hieman läpikuultavia; alimmassa20%:ssa alfa on252–254, enimmäkseen253.
- Alfa0-pikseleitä on592590. Niiden rajaus on x67–954, y215–1072. Keskiaukossa on myös alfa1-pikseleitä ja reunan häivytys; koko aukko ei täytä ehdotonta alfa0-vaatimusta. Pyydetyn aukon skaalatussa80% ydinkiekossa413207 pikselistä411364 on alfa0.
- Renkaan ulkohalkaisijan **silmämääräinen arvio1190±30px** (noin116% natiivin leveydestä), yläreunan seinämarginaali **45±15px** (noin2,9% korkeudesta). Nämä ovat visuaalisia arvioita, eivät segmentoinnilla varmennettuja mittoja;108% ja3–4% -ehtoja ei kuitata täytetyiksi.
- Renkaan alapuolella täysin vapaa seinä on silmämääräisesti noin300px eli20% korkeudesta, ei noin30%. Jo lähteen108%-halkaisija ja3–4%-ylämarginaali jättävät puhtaasti renkaan alle noin24–25% korkeudesta; tästä geometrisesta likimääräisyydestä on preflight-merkintä.

Yksi pyöreä ikkuna, tumma metalli, pultit, harmaat kiinnikkeet ja oranssi ylähihna näkyvät. Maa, pikkumaapallo, astronautti, tekstit ja UI eivät näy. Metalli on viitettä valoisampi/terävämpi ja yksityiskohdat tulkittuja. Alaseinässä on hienovaraista generatiivista pintarytmiä.

Yllä olevat tekniset puutteet estävät toimituksen merkitsemisen käyttövalmiiksi. PNG toimitetaan muuttumattomana tarkastuskandidaattina ja epäonnistuneen teknisen QA:n näyttönä, ei toimivaksi hyväksyttynä alfakehyksenä. Natiivi-UI ja Keskustelukanava arvioivat jatkon; tämä ei ole pelimuutos, hyväksyntä tai julkaisu.
