// KORTIN LUKIJA (Natiivi-UI): webin js/lukija.js lisaaLukijanappi — kaiutinkuvake tekstikortin
// otsikkoriville (omistaja 6.9.2026: "Kaikissa missä on tekstiä" luenta).
//
// Napautus lukee kortin tekstit kertojan äänellä (Puhe.Lue, persoona "kertoja") kappale
// kerrallaan; toinen napautus pysäyttää. Vain yksi luenta kerrallaan: uusi kortti tai toisen
// kortin kaiutin pysäyttää edellisen. Luennan aikana kuvake on kultainen (web .lukee #a8741a).
// Kertoja pois → vinoviiva ja nimeksi syy, nappi jää näkyviin (web .mykistetty). Alle 80 merkin
// teksti ei tarjoa kaiutinta (web LUETTAVAN_VAHIMMAIS). Kortin sulkija kutsuu Pysayta.
//
// NOSTOKORTIN LUENNAN SÄÄTIMET (saatimet: true; omistaja 27.9.2026 klo 09.3x, web #3388 js/lukija.js):
//   [⚙] [kaiutin)))]   Juuri = rivi, jonka kortti lisää otsikkoriville (ratas kaiuttimen vasemmalla).
//   1. Kaiutin keskeyttää ja jatkaa (Puhe.Tauko/Jatka, näytteen tarkka). Jos luenta katkeaa muualta (toinen luenta,
//      kortin vaihe), viimeksi kuultu pala jää talteen ja seuraava napautus jatkaa sen alusta; loppuun luettu alkaa alusta.
//   2. Keskeytettynä kaiutin vilkkuu kevyesti (vain läpinäkyvyys, USS-transitio; vähennetty liike: ei vilkuntaa).
//   3. LUKIJAN VALIKKO (omistaja 28.9.2026, web #3537 js/lukija.js avaaValikko; korvaa säätörattaan): kaiuttimen
//      vasemmalla mini-hampurilainen (30,4 pt, ikoni 17,6). Valikko 320 pt (kortin sisällä 8 pt:n marginaalilla) napin
//      alla: kappalelista (väliotsikko lihavoituna omana rivinään, leipäteksti "N  alkusanat…", nykyinen korostettuna,
//      napautus hyppää kohtaan; piilossa, jos rivejä < 2), nopeus 0,6–1,6 ja ääni pelinimellä, alimpana kelausrivi
//      (vasemmalla |◁ ja −10 s, oikealla +10 s ja ▷|; harmaana ennen luentaa). Napautus valikon ohi sulkee VAIN valikon
//      ja nielee saman kosketuksen (ei korttia, ei läpäisyä alempaan kerrokseen).
//   5. LATAUSRENGAS: kun luenta on pyydetty mutta pala ei vielä soi, 250 ms:n jälkeen kaiuttimen ympärillä pyörii kaari
//      (1,5 pt, kaksi neljännestä, 0,9 s/kierros, 55 %), häivytys 0,22 s; pois, kun ääni alkaa.
//   4. Kaiuttimen kolme kaarta ovat VU-mittari kuten isoisän luennassa (Matkakirjakortti.Mittari): luennan aikana
//      Puhe.SoivaTaso, muuten täysinä.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class KortinLukija
    {
        public const int Vahimmais = 80;
        const string SaadinOtsikko = "Luennan valikko — kappaleet, kelaus, nopeus ja ääni", JatkaOtsikko = "Jatka kuuntelua", KeskeytaOtsikko = "Keskeytä kuuntelu";
        // Sama kaiutin kuin isoisän luennassa (Matkakirjakortti): runko ja kolme kaarta, jotka ovat VU-mittari.
        const string KaiutinRunko = "M4.2 9.3h3.2l4.4-3.6v12.6l-4.4-3.6H4.2z";
        static readonly string[] Kaaret =
        {
            "M14.6 9.6a3.4 3.4 0 0 1 0 4.8",
            "M17.1 7.2a6.8 6.8 0 0 1 0 9.6",
            "M19.6 4.8a10.2 10.2 0 0 1 0 14.4",
        };
        static readonly float[] Kynnykset = { 0.04f, 0.10f, 0.20f };
        // Web OHJAIN_PIIRROT (24 × 24, viiva 1,6): valikko, edellinen ja seuraava kappale.
        const string ValikkoIkoni = "<path d=\"M4.5 5h15M4.5 12h15M4.5 19h15\"/>";
        const string EdellinenIkoni = "<path d=\"M7.4 6.6v10.8\"/><path d=\"M17 6.8 10.2 12l6.8 5.2z\"/>";
        const string SeuraavaIkoni = "<path d=\"M16.6 6.6v10.8\"/><path d=\"M7 6.8l6.8 5.2L7 17.2z\"/>";
        /// <summary>Web KELAUS_S ja KAPPALEEN_NIMI / KAPPALEEN_ALKU (merkkiä).</summary>
        const float KelausS = 10f;
        const int NimenPituus = 60, AlunPituus = 34;
        /// <summary>Web .lukija-valikko: leveys 20 rem, marginaali 8 px kortin reunoista, 0,3 rem napin alle.</summary>
        const float ValikkoLeveys = 320f, ValikkoVara = 8f, ValikkoRako = 4.8f;
        /// <summary>Latausrenkaan viive (ms) ja kierros (s).</summary>
        const float RengasViiveMs = 250f, RengasKierrosS = 0.9f;
        const long VilkkuMs = 700;
        static KortinLukija ajossa;

        /// <summary>Pysäytyksen häivytys: napsahdukseton mutta välitön (luenta alusta, omistaja 29.9.2026).</summary>
        const float PysaytysS = 0.03f;

        public readonly Button Nappi;
        /// <summary>Kortille lisättävä elementti: säätimillä rivi [ratas][kaiutin], muuten Nappi.</summary>
        public readonly VisualElement Juuri;
        readonly bool saatimet;
        readonly Button ratas;
        readonly VisualElement rengas;
        readonly Func<Rect> rajaus;
        /// <summary>Valikon rivit: lihavoitu väliotsikko tai "N alkusanat", ja pala, josta rivi aloittaa.</summary>
        readonly List<(string Otsikko, string Leipa, int Pala)> kohdat = new List<(string, string, int)>();
        /// <summary>Leipätekstikappaleiden ensimmäiset palat (kelauksen kappale eteen/taakse).</summary>
        readonly List<int> kappaleAlut = new List<int>();
        readonly List<(Button Nappi, int Pala, bool Leipa)> valikkoRivit = new List<(Button, int, bool)>();
        readonly List<Button> kelausnapit = new List<Button>();
        float latausAlku = float.NaN, renkaanKulma;
        readonly SvgIkoni[] kaaret;
        readonly float[] kaariTaso = new float[3];
        IVisualElementScheduledItem mittari, vilkku;
        VisualElement paneeli;
        string otsikko;
        List<string> palat = new List<string>();
        List<string> tagit = new List<string>();
        bool luetaan, keskeytetty;
        int versio;

        // PINNATTU LUENTA TAUSTALLA (omistaja 6.10. 23.0x: "jos klikkaan noston uudestaan auki, luenta alkaa virheellisesti
        // alusta"; Raamattu: luenta jatkuu samasta kohdasta): luenta on oma ketjunsa. Kun pinnatun noston kortti suljetaan
        // (pienennys palkiksi) tai kortti vaihtaa sisältöä, ketju irtoaa lukijasta ja jatkaa taustalla niin kauan kuin
        // Puhe.Pinnattu on sen omistaja; saman noston palatessa (Aseta samalla omistajalla) ketju kiinnittyy takaisin, ja
        // kaiutin, valikko ja jatkokohta jatkavat siitä.
        sealed class Ketju
        {
            public string Omistaja;
            public List<string> Palat, Tagit;
            public int Kohta;
            public bool Elossa = true;
        }
        /// <summary>Tähän lukijaan kiinnitetty luenta (null = ei luentaa).</summary>
        Ketju ketju;
        /// <summary>Pinnattu luenta, jonka kortti suljettiin tai vaihtui (jatkuu taustalla).</summary>
        static Ketju tausta;
        /// <summary>Luettavan sisällön omistaja (Puhe.Pinnaa-tunniste, esim. "nosto:&lt;id&gt;"); null = ei pinnattavissa.</summary>
        public string Omistaja { get; private set; }
        bool PinnattuTama => ketju != null && ketju.Omistaja != null && Puhe.Instanssi?.Pinnattu == ketju.Omistaja;

        /// <summary>
        /// Pinnatun palkin edistyminen koko luennan matkalta (kaikki palat merkkimäärillä painotettuna, soiva pala aika/kesto);
        /// null = pinnattu ei ole kortin luenta (esim. Pulun chat), jolloin palkki käyttää soivan palan edistymistä.
        /// </summary>
        public static float? KokoEdistyminen(float aika, float kesto)
        {
            var p = Puhe.Instanssi?.Pinnattu;
            if (p == null) return null;
            Ketju k = tausta != null && tausta.Elossa && tausta.Omistaja == p ? tausta
                : ajossa?.ketju != null && ajossa.ketju.Omistaja == p ? ajossa.ketju : null;
            if (k == null || k.Palat == null || k.Palat.Count == 0) return null;
            float koko = 0f, ennen = 0f;
            int nyt = Mathf.Clamp(k.Kohta, 0, k.Palat.Count - 1);
            for (int j = 0; j < k.Palat.Count; j++) { koko += k.Palat[j].Length; if (j < nyt) ennen += k.Palat[j].Length; }
            if (koko <= 0f) return null;
            float osa = kesto > 0f ? Mathf.Clamp01(aika / kesto) : 0f;
            return Mathf.Clamp01((ennen + k.Palat[nyt].Length * osa) / koko);
        }
        /// <summary>Soiva (tai viimeksi kuultu) pala; katkennut luenta jatkaa tästä (web __lukijaKohta).</summary>
        int kohta, jatkoKohta = -1;

        /// <summary>Luennan persoona (Puhe.Lue): kortit kertojalla, Pulun chat "pollo" (Pelikoodari 29.9.2026).</summary>
        readonly string persoona;
        /// <summary>
        /// Valikon ääni-valitsimen tilalle rakennettava rivi (Pulun chat: "Lue vastaukset automaattisesti", koska Pululla on
        /// yksi ääni). Null = kertojan ääni-valitsin kuten ennen.
        /// </summary>
        readonly Action<VisualElement> korvaavaAaniRivi;
        /// <summary>Valikon lisärivi ääni-valitsimen alle (lehti: "Jatkuva luenta"). Null = ei riviä.</summary>
        readonly Action<VisualElement> lisaRivi;
        /// <summary>
        /// Luenta luettiin loppuun omia aikojaan (viimeinen pala soi loppuun; lehti: jatkuva luenta kääntää sivua). Ei laukea
        /// käyttäjän pysäytyksestä, sulusta, kelauksesta eikä uudesta luennasta: versio vaihtuu niissä ennen palan loppua.
        /// </summary>
        readonly Action loppui;

        public KortinLukija(VisualElement isa, string otsikko = "Kuuntele kortti", string luokka = null, bool saatimet = false,
            Func<Rect> rajaus = null, string persoona = "kertoja", Action<VisualElement> aaniRivi = null,
            Action<VisualElement> lisaRivi = null, Action loppui = null)
        {
            this.lisaRivi = lisaRivi;
            this.loppui = loppui;
            this.otsikko = otsikko;
            this.persoona = persoona;
            korvaavaAaniRivi = aaniRivi;
            this.saatimet = saatimet;
            this.rajaus = rajaus;
            if (!saatimet)
            {
                Nappi = Rakenne.Nappi(null, "mk-lukija" + (luokka != null ? " " + luokka : ""), Vaihda, isa, Ikonit.Viiva["kaiutin"]);
                Rakenne.El("mk-kaiutin__vinoviiva", Nappi, PickingMode.Ignore);
                Juuri = Nappi;
            }
            else
            {
                Juuri = Rakenne.El("mk-lukija-rivi" + (luokka != null ? " " + luokka : ""), isa, PickingMode.Ignore);
                // Mini-hampurilainen kaiuttimen vasemmalla (entisen rattaan paikalla), sama pystykeskitys.
                ratas = Rakenne.Nappi(null, "mk-lukija mk-lukija__valikkonappi", VaihdaPaneeli, Juuri);
                ratas.tooltip = SaadinOtsikko;
                // Juna 155 (omistaja: kolme oikeinta eri korkeuksilla): ☰ väljemmin viivavälein, jotta näkyvä korkeus on pinnin ja
                // kaiuttimen luokkaa (~14 pt); sama 15 yksikön leveys kuin OHJAUSNAPPI-sarjan ☰:ssa.
                Rakenne.Ikoni(ValikkoIkoni, "mk-lukija__valikkoikoni", ratas);
                Nappi = Rakenne.Nappi(null, "mk-lukija mk-lukija--kortti", Vaihda, Juuri);
                var kuvake = Rakenne.El("mk-kaiutin", Nappi, PickingMode.Ignore);
                Rakenne.Ikoni(KaiutinRunko, "mk-kaiutin__osa", kuvake);
                kaaret = new SvgIkoni[3];
                for (int i = 0; i < 3; i++)
                {
                    kaaret[i] = Rakenne.Ikoni(Kaaret[i], "mk-kaiutin__osa mk-kaiutin__kaari mk-lukija__kaari", kuvake);
                    kaariTaso[i] = 1f;
                }
                Rakenne.El("mk-kaiutin__vinoviiva", kuvake, PickingMode.Ignore);
                rengas = Rakenne.El("mk-lukija__rengas", kuvake, PickingMode.Ignore);
            }
            Asetukset.Muuttui += _ => PaivitaMykistys();
            PaivitaMykistys();
            Juuri.style.display = DisplayStyle.None;
        }

        /// <summary>
        /// Tekstit napautushetkellä (lehden sivu, nähtävyysjuttu: sisältö syntyy vasta sivun ladonnassa). Kun asetettu,
        /// kaiutin ja valikko hakevat tekstit tästä, jos luenta ei ole käynnissä; näkymä hoitaa Juuren näkyvyyden.
        /// </summary>
        public Func<IEnumerable<string>> Lahde;

        void LataaLahteesta()
        {
            if (Lahde == null || luetaan) return;
            var raaka = (Lahde() ?? Enumerable.Empty<string>()).Where(t => !string.IsNullOrWhiteSpace(t)).Select(t => t.Trim()).ToList();
            (palat, tagit) = Lukijaaani.LuennanPalatJaTagit(raaka);
            KokoaKohdat(raaka);
            if (jatkoKohta >= palat.Count) jatkoKohta = -1;
        }

        /// <summary>Sisältö vaihtui (sivu, juttu): luenta seis, valikko kiinni, ei jatkoa vanhasta kohdasta.</summary>
        public void Vaihtui()
        {
            Pysayta();
            jatkoKohta = -1;
            AsetaKeskeytys(false);
        }

        /// <summary>Kortin luettavat tekstit (kappaleet); edellinen luenta pysähtyy (web: uusi kortti ruudulle).</summary>
        public void Aseta(IEnumerable<string> tekstit, string otsikko = null, string omistaja = null)
        {
            if (otsikko != null) this.otsikko = otsikko;
            Pysayta();
            Omistaja = omistaja;
            jatkoKohta = -1;
            AsetaKeskeytys(false);
            SuljePaneeli();
            if (ajossa != null && ajossa != this) ajossa.Pysayta();
            var raaka = (tekstit ?? Enumerable.Empty<string>()).Where(t => !string.IsNullOrWhiteSpace(t)).Select(t => t.Trim()).ToList();
            // Lukijan putkitus (Pelikoodari 27.9.): otsikko kappaleen alkuun, pitkä kappale paloiksi.
            (palat, tagit) = Lukijaaani.LuennanPalatJaTagit(raaka);
            KokoaKohdat(raaka);
            // Säätöratas seuraa kaiutinta: ilman luettavaa ei säätimiäkään (web __lukijaSaadin.hidden).
            Juuri.style.display = raaka.Sum(p => p.Length) >= Vahimmais ? DisplayStyle.Flex : DisplayStyle.None;
            PaivitaMykistys();
            // Pinnattu nosto palasi: taustalla jatkunut luenta kiinnittyy takaisin samaan kohtaan.
            if (omistaja != null && tausta != null && tausta.Elossa && tausta.Omistaja == omistaja && Puhe.Instanssi?.Pinnattu == omistaja)
            {
                ketju = tausta;
                tausta = null;
                palat = ketju.Palat; tagit = ketju.Tagit;
                kohta = ketju.Kohta;
                if (ajossa != null && ajossa != this) ajossa.Pysayta();
                ajossa = this;
                luetaan = true;
                Nappi.AddToClassList("mk-lukee");
                KaynnistaMittari();
                PaivitaNimi();
                PaivitaValikko();
                Debug.Log($"MATKAKIRJA ui lukija: pinnattu luenta jatkuu palasta {kohta + 1}/{palat.Count} ({omistaja})");
            }
        }

        void PaivitaMykistys()
        {
            // Luenta kuuluu aina pyynnöstä (omistaja 27.9. klo 15.5x, web #3422 const mykka = false): kaiutin ei mykisty.
            bool mykka = false;
            Nappi.EnableInClassList("mk-mykistetty", mykka);
            PaivitaNimi();
            if (mykka && luetaan) Pysayta();
        }

        void PaivitaNimi()
        {
            Nappi.tooltip = !saatimet ? otsikko : keskeytetty ? JatkaOtsikko : luetaan ? KeskeytaOtsikko : otsikko;
        }

        void Vaihda()
        {
            if (saatimet && luetaan)
            {
                // Web kortinPainallus: kaiutin keskeyttää ja jatkaa soittimen tauolla.
                var p = Puhe.Instanssi;
                if (p == null) { Pysayta(); return; }
                if (p.Tauolla) p.Jatka();
                else if (!p.Tauko()) return; // pala vielä latautuu: ei taukoa
                AsetaKeskeytys(p.Tauolla);
                PaivitaNimi();
                return;
            }
            if (luetaan) { Pysayta(); return; }
            LataaLahteesta();
            Aloita(saatimet && jatkoKohta >= 0 && jatkoKohta < palat.Count ? jatkoKohta : 0);
        }

        /// <summary>Luenta palasta <paramref name="alku"/> (kaiutin, kappalelista, kelaus); käynnissä oleva vaihtuu.</summary>
        void Aloita(int alku)
        {
            var puhe = Puhe.Hae();
            if (palat.Count == 0 || puhe == null) return;
            if (ajossa != null && ajossa != this) ajossa.Pysayta();
            ajossa = this;
            // LUENTA ALUSTA (omistaja 29.9.2026: luenta A kesken → karttanapautus → nosto B → kaiutin, B alkoi ensimmäisen
            // virkkeen keskeltä): edellinen puhe (myös muun lähteen) seis heti ennen uutta, tauko- ja palatila tyhjiksi.
            Puhe.Instanssi?.Pysayta(PysaytysS);
            Debug.Log($"MATKAKIRJA ui lukija: aloita pala {Mathf.Clamp(alku, 0, palat.Count - 1) + 1}/{palat.Count} \"{Lyhenna(palat[Mathf.Clamp(alku, 0, palat.Count - 1)], 40)}\"");
            luetaan = true;
            Nappi.AddToClassList("mk-lukee");
            ++versio;
            int i = Mathf.Clamp(alku, 0, palat.Count - 1);
            var k = new Ketju { Omistaja = Omistaja, Palat = palat, Tagit = tagit, Kohta = i };
            if (ketju != null) ketju.Elossa = false;
            ketju = k;
            jatkoKohta = -1;
            AsetaKeskeytys(false);
            KaynnistaMittari();
            PaivitaNimi();
            void Seuraava()
            {
                if (!k.Elossa) return;
                bool kiinni = ketju == k;
                // Taustalla jatkuu vain, kun luenta on yhä pinnattu (uusi luenta tai pinnauksen poisto lopettaa sen).
                if (!kiinni && Puhe.Instanssi?.Pinnattu != k.Omistaja) { k.Elossa = false; if (tausta == k) tausta = null; return; }
                if (i >= k.Palat.Count)
                {
                    k.Elossa = false;
                    if (tausta == k) tausta = null;
                    if (kiinni) { ketju = null; jatkoKohta = -1; kohta = palat.Count; Pysayta(false); loppui?.Invoke(); } // luettu loppuun: alusta
                    return;
                }
                k.Kohta = i;
                if (kiinni) { kohta = i; latausAlku = Time.unscaledTime * 1000f; }
                if (!puhe.Lue(k.Palat[i], persoona, 0, () => UiKerros.PaaSaikeessa(Seuraava), pyynnosta: true, loppuTagi: k.Tagit[i]))
                {
                    k.Elossa = false;
                    if (tausta == k) tausta = null;
                    if (kiinni) Pysayta();
                    return;
                }
                i++;
                Esihae(puhe, k.Palat, i, persoona, k.Tagit);
                if (kiinni) PaivitaValikko();
            }
            Seuraava();
        }

        /// <summary>
        /// Lukijan putkitus (omistaja 27.9. klo 01.5x: pitkä tauko otsikon ja kappaleiden välissä): kun pala i−1 alkaa soida,
        /// kaksi seuraavaa palaa generoidaan jo taustalla samalla persoonalla (Puhe.Esihae), joten seuraava ei odota
        /// koko generointia. Yhteinen Lehtinakyma- ja Nahtavyysarkki-luennalle.
        /// </summary>
        public static void Esihae(Puhe puhe, IReadOnlyList<string> palat, int i, string persoona = "kertoja", IReadOnlyList<string> tagit = null)
        {
            if (puhe == null || palat == null) return;
            // Kaikki kutsujat ovat kaiuttimen luentoja (pyynnöstä): esihaku myös Kertoja pois -tilassa.
            // Sama loppu-tagi kuin Luessa, muuten avain ei osu ja pala generoitaisiin kahdesti.
            if (i < palat.Count) puhe.Esihae(palat[i], persoona, pyynnosta: true, loppuTagi: tagit?[i]);
            if (i + 1 < palat.Count) puhe.Esihae(palat[i + 1], persoona, pyynnosta: true, loppuTagi: tagit?[i + 1]);
        }

        /// <summary>Luenta seis (kortti suljettiin, sivu vaihtui tai toinen kortti aukesi).</summary>
        /// <summary>Testikomento (ui nostonappi kaiutin): kuin kaiuttimen napautus.</summary>
        public void Paina() => Vaihda();

        /// <summary>Testikomento (ui nosto &lt;valo&gt; valikko): kuin valikkonapin napautus.</summary>
        public void AvaaValikko() { if (saatimet) VaihdaPaneeli(); }

        public void Pysayta() => Pysayta(true);

        /// <summary>Tämä lukija lukee (myös tauolla); Pulun chat erottaa sillä oman automaattisen luentansa.</summary>
        public bool Lukee => luetaan;

        /// <summary>
        /// Jokin kortin lukija lukee (nostokortti, lehti, wiki …; myös tauolla). Matkakirjakortin luentavahti ei avaa korttia
        /// tämän aikana: kertoja lukee silloin kortin tekstiä, ei matkakirjan omaa (Päätoimittaja 1.10.2026).
        /// </summary>
        public static bool KorttiaLuetaan => (ajossa != null && ajossa.luetaan) || (tausta != null && tausta.Elossa);

        /// <summary>Luenta seis; sulje = false jättää valikon auki (luettu loppuun).</summary>
        void Pysayta(bool sulje)
        {
            if (sulje) SuljePaneeli();
            if (!luetaan) return;
            // Pinnattu luenta ei pysähdy kortin sulkuun tai sisällön vaihtoon: ketju irtoaa ja jatkaa taustalla.
            if (PinnattuTama && ketju.Elossa)
            {
                tausta = ketju;
                ketju = null;
                luetaan = false;
                Nappi.RemoveFromClassList("mk-lukee");
                if (ajossa == this) ajossa = null;
                PysaytaMittari();
                PaivitaNimi();
                PaivitaValikko();
                Debug.Log($"MATKAKIRJA ui lukija: pinnattu luenta jatkuu taustalla palasta {tausta.Kohta + 1}/{tausta.Palat.Count} ({tausta.Omistaja})");
                return;
            }
            luetaan = false;
            versio++;
            if (ketju != null) { ketju.Elossa = false; ketju = null; }
            Nappi.RemoveFromClassList("mk-lukee");
            if (ajossa == this) ajossa = null;
            // Web talletaKortinKohta: katkennut kortti jatkaa viimeksi kuullusta palasta (Aseta nollaa uuden sisällön).
            if (saatimet && kohta < palat.Count) { jatkoKohta = kohta; AsetaKeskeytys(true); }
            PysaytaMittari();
            PaivitaNimi();
            PaivitaValikko();
            // Kortin sulku tai uusi sisältö pysäyttää heti (ei 0,3 s:n häivytystä, jonka aikana uusi luenta voi alkaa).
            Puhe.Instanssi?.Pysayta(PysaytysS);
        }

        // --- keskeytyksen vilkku ja VU -------------------------------------------------------------

        void AsetaKeskeytys(bool k)
        {
            if (!saatimet) return;
            keskeytetty = k;
            Nappi.EnableInClassList("mk-lukija--keskeytetty", k);
            if (!k || LinssiUi.VahennettyLiike())
            {
                vilkku?.Pause();
                vilkku = null;
                Nappi.RemoveFromClassList("mk-lukija--himmea");
                return;
            }
            // Kevyt vilkku: luokka vaihtuu 700 ms välein ja USS-transitio (opacity) tekee siirtymän. Vain kun kaiutin
            // näkyy; muuten ajo raukeaa (ei piirtoa piilossa).
            if (vilkku != null) return;
            vilkku = Nappi.schedule.Execute(() =>
            {
                if (!keskeytetty || Nappi.panel == null || !Rakenne.Naytetaan(Nappi))
                {
                    vilkku?.Pause();
                    vilkku = null;
                    Nappi.RemoveFromClassList("mk-lukija--himmea");
                    return;
                }
                Nappi.ToggleInClassList("mk-lukija--himmea");
                Ruudunpaivitys.Herata(0.7f);
            }).Every(VilkkuMs);
        }

        void KaynnistaMittari()
        {
            if (!saatimet || mittari != null) return;
            mittari = Nappi.schedule.Execute(Mittari).Every(16);
        }

        void PysaytaMittari()
        {
            mittari?.Pause();
            mittari = null;
            latausAlku = float.NaN;
            rengas?.RemoveFromClassList("mk-lukija__rengas--nakyy");
            if (kaaret == null) return;
            for (int i = 0; i < 3; i++) { kaariTaso[i] = 1f; kaaret[i].style.opacity = StyleKeyword.Null; }
        }

        /// <summary>Kaaret VU:na (Matkakirjakortti.Mittari: nousu ~18 ms, lasku ~120 ms); tauolla täysinä.</summary>
        void Mittari()
        {
            if (!luetaan || Nappi.panel == null) { PysaytaMittari(); return; }
            var p = Puhe.Instanssi;
            bool tauko = p != null && p.Tauolla;
            float rms = p != null ? p.SoivaTaso : 0f;
            float dt = Time.unscaledDeltaTime;
            for (int i = 0; i < 3; i++)
            {
                float tavoite = tauko ? 1f : rms >= Kynnykset[i] ? 1f : 0.2f;
                float nopeus = tavoite > kaariTaso[i] ? dt / 0.018f : dt / 0.12f;
                kaariTaso[i] = Mathf.MoveTowards(kaariTaso[i], tavoite, nopeus);
                kaaret[i].style.opacity = kaariTaso[i];
            }
            // Latausrengas: pyydetty pala ei vielä soi (generointi) 250 ms:n jälkeen; pois, kun ääni alkaa.
            if (p != null && p.Soi) latausAlku = float.NaN;
            bool lataa = !tauko && !float.IsNaN(latausAlku) && Time.unscaledTime * 1000f - latausAlku > RengasViiveMs;
            if (rengas != null)
            {
                rengas.EnableInClassList("mk-lukija__rengas--nakyy", lataa);
                if (lataa || rengas.resolvedStyle.opacity > 0.01f)
                {
                    float kierros = LinssiUi.VahennettyLiike() ? 2.4f : RengasKierrosS;
                    renkaanKulma = (renkaanKulma + dt * 360f / kierros) % 360f;
                    rengas.style.rotate = new Rotate(renkaanKulma);
                    Ruudunpaivitys.Herata(0.1f);
                }
            }
            if (!tauko) Ruudunpaivitys.Herata(0.1f);
        }

        // --- säätörattaan paneeli ------------------------------------------------------------------

        static string NopeusTeksti(float arvo) =>
            arvo.ToString("0.00", System.Globalization.CultureInfo.InvariantCulture).Replace('.', ',') + "×";

        void VaihdaPaneeli()
        {
            if (paneeli != null) { SuljePaneeli(); return; }
            LataaLahteesta();
            // Valikko kerroksen juureen päällimmäiseksi (kortin myöhemmät sisarukset eivät piirry sen päälle). Paikka
            // otsikkorivin alle, oikea reuna rivin oikeaan reunaan; leveys ja paikka kortin sisään 8 pt:n marginaalilla.
            var juuri = Juuri.panel?.visualTree;
            if (juuri == null) return;
            paneeli = Rakenne.El("mk-lukija-valikko", juuri);
            paneeli.RegisterCallback<PointerDownEvent>(e => e.StopPropagation());
            var koti = Juuri.worldBound; // nappipari (nostokortissa kiinnitetty kortin yläkulmaan)
            var raja = rajaus?.Invoke() ?? juuri.worldBound;
            if (raja.width <= 0 || float.IsNaN(raja.width)) raja = juuri.worldBound;
            float w = Mathf.Min(ValikkoLeveys, raja.width - 2f * ValikkoVara);
            float x = Mathf.Min(koti.xMax, raja.xMax - ValikkoVara) - w;
            x = Mathf.Max(x, raja.xMin + ValikkoVara);
            var alku = juuri.WorldToLocal(new Vector2(x, Mathf.Max(koti.yMax, ratas.worldBound.yMax) + ValikkoRako));
            paneeli.style.width = Mathf.Round(w);
            paneeli.style.left = Mathf.Round(alku.x);
            paneeli.style.top = Mathf.Round(alku.y);
            paneeli.style.maxHeight = Mathf.Round(Mathf.Min(512f, juuri.layout.height * 0.7f, juuri.layout.height - alku.y - ValikkoVara));

            // 1. kappaleet (web .lukija-kappaleet): yksi rivi per kohta, nykyinen korostettuna.
            valikkoRivit.Clear();
            var lista = valikkoLista = new ScrollView(ScrollViewMode.Vertical);
            lista.AddToClassList("mk-lukija-valikko__kappaleet");
            lista.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            lista.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            paneeli.Add(lista);
            int numero = 0;
            foreach (var (ots, leipa, pala) in kohdat)
            {
                int kohde = pala;
                var b = Rakenne.Nappi(null, "mk-lukija-valikko__kappale" + (ots != null ? " mk-lukija-valikko__kappale--otsikko" : ""),
                    () => Hyppaa(kohde), lista);
                if (ots != null)
                {
                    var t = Rakenne.Teksti(ots, "mk-lukija-valikko__alku", b);
                    t.enableRichText = false;
                    Kirjasimet.Aseta(t, Kirjasin.LukuLihava);
                    b.tooltip = "Kuuntele otsikosta: " + Lyhenna(ots, 40);
                }
                else
                {
                    numero++;
                    Kirjasimet.Aseta(Rakenne.Teksti(numero.ToString(), "mk-lukija-valikko__nro", b), Kirjasin.Luku);
                    var t = Rakenne.Teksti(leipa, "mk-lukija-valikko__alku", b);
                    t.enableRichText = false;
                    Kirjasimet.Aseta(t, Kirjasin.Luku);
                    b.tooltip = $"Kuuntele kappaleesta {numero}";
                }
                valikkoRivit.Add((b, kohde, ots == null));
            }
            lista.style.display = valikkoRivit.Count >= 2 ? DisplayStyle.Flex : DisplayStyle.None;

            // 2. nopeus ja ääni (entinen säätöratas).
            var saadot = Rakenne.El("mk-lukija-valikko__saadot", paneeli, PickingMode.Ignore);
            var nopeusRivi = Rakenne.El("mk-lukija-saadot__rivi", saadot, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("Nopeus", "mk-lukija-saadot__nimi", nopeusRivi), Kirjasin.Luku);
            // Äänentasojen liukutyyli (mk-saadin: kultainen täyttö ja nuppi, Aanentasot.LuoSaadinrivi).
            var liuku = new Slider(Puhe.NopeusMin, Puhe.NopeusMax) { value = Puhe.Nopeus, pageSize = 0, fill = true };
            liuku.AddToClassList("mk-saadin");
            liuku.AddToClassList("mk-lukija-saadot__liuku");
            nopeusRivi.Add(liuku);
            var arvo = Rakenne.Teksti(NopeusTeksti(Puhe.Nopeus), "mk-lukija-saadot__arvo", nopeusRivi);
            Kirjasimet.Aseta(arvo, Kirjasin.Luku);
            liuku.RegisterValueChangedCallback(e =>
            {
                // Askel 0,05 (web step): arvo pyöristetään ja tallennetaan heti; kuuluu seuraavasta palasta.
                Puhe.Nopeus = Mathf.Round(e.newValue / Puhe.SaatoAskel) * Puhe.SaatoAskel;
                arvo.text = NopeusTeksti(Puhe.Nopeus);
            });

            if (korvaavaAaniRivi != null) korvaavaAaniRivi(saadot);
            else RakennaAaniValinta(saadot);
            lisaRivi?.Invoke(saadot);

            // 3. kelaus ALIMPANA (omistaja: "alimpana -10sek ja +10sek"): taaksepäin vasemmalla, eteenpäin oikealla.
            kelausnapit.Clear();
            var kelaus = Rakenne.El("mk-lukija-valikko__kelaus", paneeli, PickingMode.Ignore);
            var taakse = Rakenne.El("mk-lukija-valikko__ryhma", kelaus, PickingMode.Ignore);
            var eteen = Rakenne.El("mk-lukija-valikko__ryhma", kelaus, PickingMode.Ignore);
            void Kelausnappi(VisualElement isa, string nimi, string teksti, string ikoni, Action toiminto)
            {
                var b = Rakenne.Nappi(teksti, "mk-lukija-valikko__kelausnappi", () => { if (luetaan) toiminto(); }, isa);
                b.tooltip = nimi;
                if (teksti != null) Kirjasimet.Aseta(b, Kirjasin.LukuLihava);
                if (ikoni != null) Rakenne.Ikoni(ikoni, "mk-lukija-valikko__kelausikoni", b);
                kelausnapit.Add(b);
            }
            Kelausnappi(taakse, "Edellinen kappale", null, EdellinenIkoni, () => SiirryKappale(-1));
            Kelausnappi(taakse, $"{KelausS:0} sekuntia taaksepäin", $"−{KelausS:0} s", null, () => SiirryAika(-KelausS));
            Kelausnappi(eteen, $"{KelausS:0} sekuntia eteenpäin", $"+{KelausS:0} s", null, () => SiirryAika(KelausS));
            Kelausnappi(eteen, "Seuraava kappale", null, SeuraavaIkoni, () => SiirryKappale(1));

            nykyinenRivi = -1;
            PaivitaValikko();
            ratas.AddToClassList("mk-valittu");
            // Avautuu pehmeästi (web lukija-valikko-auki 170 ms): peitto 0 → 1 USS-siirtymällä.
            paneeli.style.opacity = 0f;
            paneeli.schedule.Execute(() => { if (paneeli != null) paneeli.style.opacity = 1f; }).StartingIn(16);
            Ruudunpaivitys.Herata(0.4f);
            // Napautus valikon ohi sulkee vain valikon (web kerran-kuuntelija). Valikon ponnahduslista on omassa paneelissaan.
            Juuri.panel?.visualTree.RegisterCallback<PointerDownEvent>(OhiNapautus, TrickleDown.TrickleDown);
        }

        /// <summary>
        /// Kytkinrivi valikkoon Nopeus-rivin asulla: nimi vasemmalla, päällä/pois oikealla kelausnapin tyylillä (Pulun chatin
        /// auto-luenta, lehden jatkuva luenta). Palauttaa tilatekstin, jonka kutsuja päivittää.
        /// </summary>
        public static Label KytkinRivi(VisualElement saadot, string nimi, Action painettu)
        {
            var rivi = Rakenne.El("mk-lukija-saadot__rivi", saadot, PickingMode.Ignore);
            var n = Rakenne.Teksti(nimi, "mk-lukija-saadot__nimi", rivi);
            n.style.width = StyleKeyword.Auto;
            n.style.flexGrow = 1;
            n.style.flexShrink = 1;
            n.style.whiteSpace = WhiteSpace.Normal;
            Kirjasimet.Aseta(n, Kirjasin.Luku);
            var nappi = Rakenne.Nappi("", "mk-lukija-valikko__kelausnappi", painettu, rivi);
            nappi.tooltip = nimi;
            Kirjasimet.Aseta(nappi, Kirjasin.LukuLihava);
            return nappi.Q<Label>(className: "mk-nappi__teksti");
        }

        /// <summary>
        /// Kertojan ääni-valitsin valikkoon (pelinimet; oletus ensin). Omistajan laitteella ja kehittäjätilassa yläpuolella on
        /// Moottori-rivi (xAI / ElevenLabs v4 Turbo, omistaja 30.9.2026), ja äänilista näyttää vain valitun moottorin äänet.
        /// </summary>
        static void RakennaAaniValinta(VisualElement saadot)
        {
            if (Striimiaani.MoottoriSallittu && Striimiaani.Moottorit.Count > 1)   // 5.10.2026: vain ElevenLabs → ei Moottori-riviä
            {
                var nimet = new List<string>();
                foreach (var m in Striimiaani.Moottorit) nimet.Add(m.Nimi);
                VisualElement aanet = null;
                ValintaRivi(saadot, "Moottori", nimet, Striimiaani.Moottori == Striimiaani.Eleven ? 1 : 0, "moottori", k =>
                {
                    Striimiaani.Moottori = Striimiaani.Moottorit[k].Tunnus;
                    Debug.Log("MATKAKIRJA lukija: moottori " + Striimiaani.Moottori);
                    // Äänilista vaihtuu moottorin mukaan samaan kohtaan.
                    int paikka = aanet != null ? saadot.IndexOf(aanet) : -1;
                    aanet?.RemoveFromHierarchy();
                    aanet = AaniRivi(saadot);
                    if (paikka >= 0) { aanet.RemoveFromHierarchy(); saadot.Insert(paikka, aanet); }
                    AaniVaihtui();
                });
                aanet = AaniRivi(saadot);
                return;
            }
            AaniRivi(saadot);
        }

        /// <summary>
        /// Ääni tai moottori vaihtui (omistaja 4.10.2026 klo 23.0x: "voisiko peli ladata heti uuden äänen kun ääntä vaihtaa"):
        /// soiva luenta aloittaa saman palan heti uudella äänellä ja jatkaa siitä. Välimuistiavaimessa on ääni
        /// (Lukijaaani.Valimuistiavain), joten pala haetaan uudella äänellä eikä vanha soi välimuistista.
        /// </summary>
        internal static void AaniVaihtui()
        {
            var l = ajossa;
            if (l == null || !l.luetaan || l.palat.Count == 0) return;
            int pala = Mathf.Clamp(l.kohta, 0, l.palat.Count - 1);
            Debug.Log($"MATKAKIRJA ui lukija: ääni vaihtui, pala {pala + 1}/{l.palat.Count} uudella äänellä");
            l.Aloita(pala);
        }

        /// <summary>Äänirivi valitun moottorin äänistä (ElevenLabs vain sallitulla laitteella).</summary>
        static VisualElement AaniRivi(VisualElement saadot)
        {
            bool eleven = Striimiaani.Moottori == Striimiaani.Eleven;   // aina (xAI pois, omistaja 5.10.2026)
            var lista = eleven ? Striimiaani.ElevenAanet : Striimiaani.Pelinimet;
            // Pelinimet: näytössä nimi, pyynnössä tunnus (web AANTEN_PELINIMET). Oletus ensin "Aino (oletus)".
            var nimet = new List<string> { lista[0].Nimi + " (oletus)" };
            for (int i = 1; i < lista.Count; i++) nimet.Add(lista[i].Nimi);
            string valittu = eleven ? Striimiaani.ElevenAani : Striimiaani.Valittu;
            int indeksi = 0;
            for (int i = 1; i < lista.Count; i++) if (lista[i].Tunnus == valittu) indeksi = i;
            return ValintaRivi(saadot, "Ääni", nimet, indeksi, "ääni", k =>
            {
                if (eleven) Striimiaani.ElevenAani = lista[k].Tunnus;
                else Striimiaani.Aseta(k > 0 ? lista[k].Tunnus : null);
                Debug.Log($"MATKAKIRJA ui lukija: ääni {nimet[k]}");
                AaniVaihtui();
            });
        }

        /// <summary>Avoimen valikon valintarivit testikomennolle (ui lukija valinta …): otsikko → (nimi-nappi, lista).</summary>
        static readonly Dictionary<string, (Button Nimi, ScrollView Lista)> valintaRivit = new Dictionary<string, (Button, ScrollView)>();

        /// <summary>
        /// VALINTARIVI ILMAN PONNAHDUSLISTAA (omistaja 4.10.2026 klo 23.0x–23.1x: äänilista hankala selata, harmaa
        /// vierityspalkillinen pudotusvalikko, ja sen sulkeva napautus sulki koko nostokortin; Päätoimittaja 23.3x: ei uutta
        /// pohjaa eikä erillistä ponnahduskerrosta). Rivi: nimi, ‹ › ja valittu arvo kelausnappipohjilla
        /// (mk-lukija-valikko__kelausnappi); arvon napautus avaa listan SAMAAN säätöpaneeliin kappalerivien pohjilla
        /// (mk-lukija-valikko__kappaleet, __kappale, nykyinen __kappale--nykyinen, vieritys ilman palkkia). ‹ › kiertää.
        /// </summary>
        static VisualElement ValintaRivi(VisualElement saadot, string otsikko, List<string> nimet, int indeksi, string mika, Action<int> valittu)
        {
            var kotelo = Rakenne.El("mk-lukija-saadot__valintakotelo", saadot, PickingMode.Ignore);
            var rivi = Rakenne.El("mk-lukija-saadot__rivi", kotelo, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti(otsikko, "mk-lukija-saadot__nimi", rivi), Kirjasin.Luku);
            int nyt = Mathf.Clamp(indeksi, 0, nimet.Count - 1);
            Button arvo = null;
            Label arvoTeksti = null;
            ScrollView lista = null;
            var rivit = new List<Button>();
            void Valitse(int k, bool sulje)
            {
                k = (k % nimet.Count + nimet.Count) % nimet.Count;
                if (sulje) lista.style.display = DisplayStyle.None;
                if (k == nyt) return;
                rivit[nyt].RemoveFromClassList("mk-lukija-valikko__kappale--nykyinen");
                nyt = k;
                rivit[nyt].AddToClassList("mk-lukija-valikko__kappale--nykyinen");
                arvoTeksti.text = nimet[nyt]; // napin oma teksti (Button.text) piirtyisi Labelin päälle
                if (lista.style.display == DisplayStyle.Flex) lista.ScrollTo(rivit[nyt]);
                Ruudunpaivitys.Herata(0.2f);
                valittu?.Invoke(nyt);
            }
            // Kulmakuvakkeet kuten kelausnappien ikonit (Ikonit.Takaisin / NuoliOikea, mk-lukija-valikko__kelausikoni).
            foreach (var (ikoni, suunta, nimi) in new[] { (Ikonit.Takaisin, -1, "Edellinen " + mika), (Ikonit.NuoliOikea, 1, "Seuraava " + mika) })
            {
                var b = Rakenne.Nappi(null, "mk-lukija-valikko__kelausnappi mk-lukija-saadot__selaus", () => Valitse(nyt + suunta, false), rivi);
                b.tooltip = nimi;
                Rakenne.Ikoni(ikoni, "mk-lukija-valikko__kelausikoni", b);
            }
            arvo = Rakenne.Nappi(nimet[nyt], "mk-lukija-valikko__kelausnappi mk-lukija-saadot__arvonappi", () =>
            {
                bool auki = lista.style.display != DisplayStyle.Flex;
                lista.style.display = auki ? DisplayStyle.Flex : DisplayStyle.None;
                if (auki) lista.schedule.Execute(() => lista.ScrollTo(rivit[nyt])).StartingIn(16);
                Ruudunpaivitys.Herata(0.3f);
            }, rivi);
            arvo.tooltip = $"Valitse {mika} listasta";
            // Arvo täyttää rivin loppuun ja katkeaa "…":lla kuten kappalerivi (ei uutta tyyliä: sama tekstiluokka).
            arvo.style.flexGrow = 1;
            arvo.style.flexShrink = 1;
            arvo.style.marginRight = 0;
            Kirjasimet.Aseta(arvo, Kirjasin.Luku);
            arvoTeksti = arvo.Q<Label>();
            arvoTeksti.AddToClassList("mk-lukija-valikko__alku");

            lista = new ScrollView(ScrollViewMode.Vertical);
            lista.AddToClassList("mk-lukija-valikko__kappaleet");
            lista.verticalScrollerVisibility = ScrollerVisibility.Hidden;
            lista.horizontalScrollerVisibility = ScrollerVisibility.Hidden;
            // Noin kuusi riviä näkyvissä; loput vierittyvät paneelin sisällä.
            lista.style.maxHeight = 6 * 30f;
            lista.style.display = DisplayStyle.None;
            kotelo.Add(lista);
            for (int i = 0; i < nimet.Count; i++)
            {
                int k = i;
                var b = Rakenne.Nappi(null, "mk-lukija-valikko__kappale" + (i == nyt ? " mk-lukija-valikko__kappale--nykyinen" : ""), () => Valitse(k, true), lista);
                var t = Rakenne.Teksti(nimet[i], "mk-lukija-valikko__alku", b);
                t.enableRichText = false;
                Kirjasimet.Aseta(t, Kirjasin.Luku);
                b.tooltip = nimet[i];
                rivit.Add(b);
            }
            valintaRivit[otsikko] = (arvo, lista);
            return kotelo;
        }

        /// <summary>Testi (ui lukija valinta Ääni|Moottori [avaa|n|+|-]): valintarivin tila, listan avaus tai valinta kuten napautus.</summary>
        public static string TestaaValinta(string otsikko, string toiminto)
        {
            if (!valintaRivit.TryGetValue(otsikko, out var v) || v.Nimi.panel == null) return $"valintariviä {otsikko} ei ole auki";
            Button kohde = toiminto switch
            {
                "avaa" => v.Nimi,
                "+" => v.Nimi.parent.Query<Button>(className: "mk-lukija-saadot__selaus").AtIndex(1),
                "-" => v.Nimi.parent.Query<Button>(className: "mk-lukija-saadot__selaus").AtIndex(0),
                _ when int.TryParse(toiminto, out int n) => v.Lista.Query<Button>(className: "mk-lukija-valikko__kappale").AtIndex(n),
                _ => null,
            };
            if (kohde != null) using (var e = NavigationSubmitEvent.GetPooled()) { e.target = kohde; kohde.SendEvent(e); }
            return $"{otsikko}: {v.Nimi.Q<Label>()?.text}, lista {(v.Lista.style.display == DisplayStyle.Flex ? "auki" : "kiinni")} ({v.Lista.contentContainer.childCount} riviä)";
        }

        int nykyinenRivi = -1;
        ScrollView valikkoLista;

        /// <summary>Valikon tila: kelausnapit harmaana ilman luentaa, nykyinen kappale korostettuna ja näkyvissä.</summary>
        void PaivitaValikko()
        {
            if (paneeli == null) return;
            foreach (var b in kelausnapit) b.SetEnabled(luetaan);
            int kappale = -1;
            if (luetaan)
                for (int r = 0; r < valikkoRivit.Count; r++)
                    if (valikkoRivit[r].Leipa && valikkoRivit[r].Pala <= kohta) kappale = r;
            if (kappale == nykyinenRivi) return;
            if (nykyinenRivi >= 0 && nykyinenRivi < valikkoRivit.Count) valikkoRivit[nykyinenRivi].Nappi.RemoveFromClassList("mk-lukija-valikko__kappale--nykyinen");
            nykyinenRivi = kappale;
            if (kappale < 0) return;
            var rivi = valikkoRivit[kappale].Nappi;
            rivi.AddToClassList("mk-lukija-valikko__kappale--nykyinen");
            valikkoLista?.ScrollTo(rivi);
            Ruudunpaivitys.Herata(0.2f);
        }

        /// <summary>Kappaleen napautus: hyppy käynnissä olevassa luennassa tai luennan aloitus siitä.</summary>
        void Hyppaa(int pala)
        {
            if (pala < 0 || pala >= palat.Count) return;
            Aloita(pala);
        }

        /// <summary>Kappale eteen (+1) tai taakse (−1) leipätekstin kappaleiden alkuihin (web siirryKappale).</summary>
        void SiirryKappale(int suunta)
        {
            if (kappaleAlut.Count == 0) { Aloita(Mathf.Clamp(kohta + suunta, 0, palat.Count - 1)); return; }
            int nyt = 0;
            for (int k = 0; k < kappaleAlut.Count; k++) if (kappaleAlut[k] <= kohta) nyt = k;
            int kohde = Mathf.Clamp(nyt + suunta, 0, kappaleAlut.Count - 1);
            Aloita(kappaleAlut[kohde]);
        }

        /// <summary>±10 s soivassa palassa; rajan yli edellisen tai seuraavan palan alkuun (web siirryAika).</summary>
        void SiirryAika(float sekunnit)
        {
            var p = Puhe.Instanssi;
            if (p == null) return;
            bool tauolla = p.Tauolla;
            int raja = p.Kelaa(sekunnit);
            if (raja == 0)
            {
                if (tauolla) { p.Jatka(); AsetaKeskeytys(false); PaivitaNimi(); }
                return;
            }
            int kohde = kohta + raja;
            if (kohde < 0) kohde = 0;
            if (kohde >= palat.Count) return; // viimeisen palan loppu: ei minnekään
            Aloita(kohde);
        }

        /// <summary>
        /// Valikon kohdat samoista teksteistä, joista palat kootaan: otsikko ei tuota omaa palaa (se liittyy seuraavan
        /// kappaleen alkuun), joten kohdan k pala = palojen määrä tekstien 0…k−1 luennassa (Lukijaaani.LuennanPalatJaTagit).
        /// </summary>
        void KokoaKohdat(List<string> raaka)
        {
            kohdat.Clear();
            kappaleAlut.Clear();
            if (!saatimet) return;
            int ennen = 0;
            for (int k = 0; k < raaka.Count; k++)
            {
                int jalkeen = Lukijaaani.LuennanPalatJaTagit(raaka.Take(k + 1)).palat.Count;
                string t = raaka[k];
                bool sanoja = System.Text.RegularExpressions.Regex.IsMatch(t, @"[\p{L}\p{N}]{2}");
                if (jalkeen == ennen)
                {
                    // Otsikko: hyppää seuraavan kappaleen alkuun (sama pala); ei kappaletta perässä → ei riviä.
                    if (ennen < palat.Count && sanoja) kohdat.Add((Lyhenna(Siisti(t), NimenPituus), null, ennen));
                }
                else if (sanoja)
                {
                    kohdat.Add((null, Lyhenna(t, AlunPituus), ennen));
                    kappaleAlut.Add(ennen);
                }
                ennen = jalkeen;
            }
        }

        static string Siisti(string t) => System.Text.RegularExpressions.Regex.Replace(t ?? "", @"[\s.·:]+$", "").Trim();

        /// <summary>Web lyhenna: sanan rajalta (yli 60 % pituudesta), loppuvälimerkit pois ja "…".</summary>
        static string Lyhenna(string teksti, int pituus)
        {
            string t = System.Text.RegularExpressions.Regex.Replace(teksti ?? "", @"\s+", " ").Trim();
            if (t.Length <= pituus) return t;
            string leikattu = t.Substring(0, pituus);
            int raja = leikattu.LastIndexOf(' ');
            string osa = raja > pituus * 0.6f ? leikattu.Substring(0, raja) : leikattu;
            return osa.TrimEnd(',', '.', ';', ':', '–', '—', '-') + "…";
        }

        /// <summary>
        /// Napautus paneelin ohi sulkee VAIN paneelin (omistaja 28.9.2026, TF 1.0.34: äänen vaihdon jälkeen ohinapautus
        /// sulki myös nostokortin). Sääntö kaikille päällekkäisille kerroksille (Fable): päällimmäinen sulkeutuu, eikä
        /// sama napautus läpäise alempaan kerrokseen. Kuuntelija on juuressa TrickleDown-vaiheessa, joten
        /// StopPropagation estää painalluksen pääsyn kortin himmennykseen; saman kosketuksen PointerUp ja Click niellään.
        /// </summary>
        bool Valikossa(VisualElement v) => v != null && (v == paneeli || paneeli.Contains(v) || ratas.Contains(v) || Pudotusvalikossa(v));

        void OhiNapautus(PointerDownEvent e)
        {
            if (paneeli == null) return;
            // Kohde poimitaan itse (1.0.40, Nostokortti.EleAlkoi): UI Toolkit antaa samaan pisteeseen osuneelle kosketukselle
            // välimuistin vanhentuneen kohteen. Omistaja 1.0.39: valikon rivin ensimmäinen napautus ei hypännyt (luenta jatkoi
            // väärästä kohdasta), vasta toinen.
            var kohde = e.target as VisualElement;
            var poimittu = paneeli.panel?.PickAll(e.position, null) ?? kohde; // tuore, ei välimuistia (ks. Nostokortti.Poimi)
            var puu = paneeli.panel?.visualTree;
            // Avoimen pudotusvalikon ohi (sen koko ruudun taustaan, ei listaan): valikko sulkee itsensä, mutta saman kosketuksen
            // Click osui listan alta paljastuvaan korttiin ja sulki koko nostokortin (omistaja 4.10.2026 klo 23.1x).
            if (PudotusvalikonTaustassa(poimittu))
            {
                if (puu != null) NieleKlikki(puu, e.pointerId);
                return;
            }
            if (Valikossa(poimittu))
            {
                var nappi = NappiAlta(poimittu);
                if (Valikossa(kohde) && NappiAlta(kohde) == nappi) return;
                // Rivi tai nappi valikossa, mutta tapahtuma meni vanhentuneelle kohteelle: nielaistaan ja painetaan nappi itse.
                e.StopPropagation();
                if (puu != null) Niele(puu, e.pointerId, nappi);
                return;
            }
            UiKerros.OhiSulki();  // maakuntalappu ei aukea samasta napautuksesta (omistaja 30.9.2026)
            SuljePaneeli();
            e.StopPropagation();
            if (puu != null) Niele(puu, e.pointerId, null);
        }

        static Button NappiAlta(VisualElement v)
        {
            for (; v != null; v = v.hierarchy.parent) if (v is Button b) return b;
            return null;
        }

        /// <summary>Saman kosketuksen irrotus ja Click nielaistaan; nappi (vanhentuneen kohteen ohi) painetaan irrotuksessa.</summary>
        void Niele(VisualElement puu, int sormi, Button nappi)
        {
            EventCallback<PointerUpEvent> ylos = null;
            EventCallback<ClickEvent> klikki = null;
            ylos = u =>
            {
                if (u.pointerId != sormi) return;
                u.StopPropagation();
                puu.UnregisterCallback(ylos, TrickleDown.TrickleDown);
                if (nappi?.panel != null && (nappi.panel.PickAll(u.position, null) is VisualElement q) && (q == nappi || nappi.Contains(q)))
                {
                    Debug.Log($"MATKAKIRJA ui lukija: vanhentunut kohde, painetaan {string.Join(".", nappi.GetClasses())}");
                    using (var s = NavigationSubmitEvent.GetPooled()) { s.target = nappi; nappi.SendEvent(s); }
                }
                // Click syntyy saman kosketuksen jälkeen; nielaisu vain tämän kehyksen ajan.
                puu.schedule.Execute(() => puu.UnregisterCallback(klikki, TrickleDown.TrickleDown));
            };
            klikki = c => { c.StopPropagation(); puu.UnregisterCallback(klikki, TrickleDown.TrickleDown); };
            puu.RegisterCallback(ylos, TrickleDown.TrickleDown);
            puu.RegisterCallback(klikki, TrickleDown.TrickleDown);
        }

        /// <summary>
        /// Omistajan löydös 1.0.32: äänen valinta "klikkautui pois". DropdownFieldin ponnahduslista (GenericDropdownMenu,
        /// luokka unity-base-dropdown) piirtyy paneelin juureen säätöpaneelin ulkopuolelle, joten listan rivin napautus
        /// tulkittiin ohinapautukseksi: paneeli (ja valitsin) poistui ennen kuin valinta ehti tallentua.
        /// </summary>
        static bool Pudotusvalikossa(VisualElement v)
        {
            for (; v != null; v = v.hierarchy.parent)
                if (v.ClassListContains(GenericDropdownMenu.ussClassName)) return true;
            return false;
        }

        /// <summary>Piste on avoimen pudotusvalikon koko ruudun taustassa (unity-base-dropdown) mutta ei sen listassa.</summary>
        static bool PudotusvalikonTaustassa(VisualElement v)
        {
            bool tausta = false;
            for (; v != null; v = v.hierarchy.parent)
            {
                if (v.ClassListContains(GenericDropdownMenu.containerOuterUssClassName)) return false;
                if (v.ClassListContains(GenericDropdownMenu.ussClassName)) tausta = true;
            }
            return tausta;
        }

        /// <summary>Vain saman kosketuksen Click nielaistaan (painallus ja irrotus jäävät pudotusvalikolle, joka sulkee itsensä).</summary>
        static void NieleKlikki(VisualElement puu, int sormi)
        {
            EventCallback<ClickEvent> klikki = null;
            EventCallback<PointerUpEvent> ylos = null;
            klikki = c => { c.StopPropagation(); puu.UnregisterCallback(klikki, TrickleDown.TrickleDown); };
            ylos = u =>
            {
                if (u.pointerId != sormi) return;
                puu.UnregisterCallback(ylos, TrickleDown.TrickleDown);
                puu.schedule.Execute(() => puu.UnregisterCallback(klikki, TrickleDown.TrickleDown));
            };
            puu.RegisterCallback(klikki, TrickleDown.TrickleDown);
            puu.RegisterCallback(ylos, TrickleDown.TrickleDown);
            Debug.Log("MATKAKIRJA ui lukija: napautus pudotusvalikon ohi, vain valikko sulkeutuu");
        }

        void SuljePaneeli()
        {
            if (paneeli == null) return;
            paneeli.panel?.visualTree.UnregisterCallback<PointerDownEvent>(OhiNapautus, TrickleDown.TrickleDown);
            // Sulku animoiden kuten avaus (omistaja 29.9.2026, Raamattu PR #3602; Ponnahdus = webin arvot).
            var p = paneeli;
            p.pickingMode = PickingMode.Ignore;
            Ponnahdus.Sulje(p, () => p.RemoveFromHierarchy());
            paneeli = null;
            valikkoLista = null;
            valikkoRivit.Clear();
            kelausnapit.Clear();
            nykyinenRivi = -1;
            Ruudunpaivitys.Herata(0.3f);
            ratas?.RemoveFromClassList("mk-valittu");
        }
    }
}
