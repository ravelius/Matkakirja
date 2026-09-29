// DIORAAMA-SOVITIN: Poikkileikkaus-linssin Unity-kytkentä (Linnanrakentaja, erä 1, 29.9.2026; MaapallonVuosiSovitin-
// malli). Ydin (Matkakirja.Linssit.Dioraama.PoikkileikkausLinssi, A3) ei tunne Unitya: tämä sovitin lataa
// rakennus.json + glb + atlas-tekstuurit, pitää DioraamaNayttamo/DioraamaRakennus/DioraamaHahmot/DioraamaSyote-
// oliot ja syöttää ajan (t = ymparisto.Aika) Ytimelle joka kehys. Katso dioraama-rajapinnat-20260929.md kohta 6.
//
// ÄMPÄRI (Päätoimittaja 29.9.: CI rakentaa paketin deterministisesti ja vie sen polkuun dioraama/<rakennus>/<hash>/,
// uusin.json viimeisenä): sovitin lukee ensin AmpariJuuri + "uusin.json" ({ polku: "<hash>/" }) ja lataa paketin sen
// alta. KEHITYSPEILI: "poikki peili file:///…/dist/dioraama/olavinlinna/" ohjaa ämpäripolut paikalliseen rakennukseen
// (siellä ei ole uusin.jsonia, joten paketti luetaan suoraan juuresta).
//
// TESTIKOMENNOT (linssi-komento.txt): "poikki peili <url|pois> | yleis | tila <id> | aika <s|pois> |
// taso <tila> <0-2> | napauta | lataa | mittaus | tila" (LinssiOhjain.Komento reitittää "poikki"-alkuiset tänne).
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Profiling;
// "Nakyma" on kahdessa nimiavaruudessa (Matkakirja.Linssit.Nakyma = pallon lat/lon-asento,
// Matkakirja.Linssit.Dioraama.Nakyma = dioraaman NakymaHetkella-tulos): alias poistaa CS0104-ristiriidan.
using DioraamaNakyma = Matkakirja.Linssit.Dioraama.Nakyma;

namespace Matkakirja.Natiivi
{
    public sealed class DioraamaSovitin : ILinssi
    {
        public const string AmpariJuuri = "https://media.matkakirja.app/dioraama/olavinlinna/";

        /// <summary>Auki oleva linssi (Natiivi-UI:n paneeli, DioraamaTaulu), muuten null.</summary>
        public static PoikkileikkausLinssi Linssi { get; private set; }
        /// <summary>Linssi avautui tai sulkeutui.</summary>
        public static event Action<PoikkileikkausLinssi> Vaihtui;
        /// <summary>Viimeisin NakymaHetkella-tulos ja sen ajanhetki (DioraamaTaulu lukee näitä joka ruutu; ei
        /// vielä kytketty LinssiUi.cs:ään tässä erässä, ks. luovutusraportti).</summary>
        public static DioraamaNakyma? ViimeisinNakyma { get; private set; }
        public static double ViimeisinT { get; private set; }
        /// <summary>Näyttämön kamera (DioraamaTaulu: Pulun 3D-paikka → ruutupiste), null kun linssi on kiinni.</summary>
        public static Camera AktiivinenKamera { get; private set; }
        /// <summary>
        /// DioraamaTaulu (UI Toolkit, ei vielä kytketty LinssiUi.cs:ään tässä erässä) voi rekisteröidä tähän oman
        /// paneelinsa ruutualueen, jottei napautus paneeliin myös osu 3D-näkymään (DioraamaSyote tarkistaa tämän
        /// ennen eleen alkua, PalloKierto.UiPeittaa-mallilla).
        /// </summary>
        public static Func<Vector2, bool> PeittaaRuutu;

        readonly LinssiOhjain o;
        readonly PalloKierto kierto;
        readonly PoikkileikkausLinssi linssi = new PoikkileikkausLinssi();

        ILinssiYmparisto y;
        Camera pallonKamera;
        DioraamaNayttamo nayttamo;
        DioraamaRakennus rakennus3D;
        DioraamaHahmot hahmot3D;
        DioraamaSyote syote;
        // ERA 2 (dioraama-aanirajapinta-ehdotus.md): PYSYVÄ kenttä (ei nollata Sulje:ssa, ks. DioraamaAanet.cs:n
        // alkukommentti) -- klippivälimuisti säilyy sulkemisen ja uudelleenavaamisen yli, kuten ladatutPinnat.
        DioraamaAanet aanet;

        Rakennus rakennus;
        bool avoinna, latausKaynnissa;
        readonly HashSet<string> tilatJonossaTaiValmiit = new HashSet<string>(StringComparer.Ordinal);
        readonly HashSet<string> atlaksetJonossaTaiValmiit = new HashSet<string>(StringComparer.Ordinal);
        // ERA 2 (dioraama-rajapinnat-era2-20260929.md kohta 3): pintojen tekstuurit ja liekkien atlakset ovat
        // rakennustason (ei tilakohtaista) dataa, jo rakennuskoneen esisuodattamia "käytettyjä" (kohta 2) --
        // siksi ei tarvita DioraamaHahmot.TarvittavatAtlakset-tyylistä tila-suodatusta, ks. TaydennaPinnatJaLiekit.
        readonly HashSet<string> pinnatJonossaTaiValmiit = new HashSet<string>(StringComparer.Ordinal);
        readonly HashSet<string> liekkiatlaksetJonossaTaiValmiit = new HashSet<string>(StringComparer.Ordinal);
        /// <summary>Sovittimen itse lataamat pinta-/liekkitekstuurit ("poikki mittaus" -muistiraportti); avain on
        /// pinnan/liekin id, ei tiedostopolku (toisin kuin hahmoatlaksissa, joissa monta henkilöä voisi jakaa polun).</summary>
        readonly Dictionary<string, Texture2D> ladatutPinnat = new Dictionary<string, Texture2D>(StringComparer.Ordinal);
        readonly Dictionary<string, Texture2D> ladatutLiekkiAtlakset = new Dictionary<string, Texture2D>(StringComparer.Ordinal);
        string peiliKuvaus = "pois (ämpäri)";
        Func<string, string> peili = s => s;
        /// <summary>Paketin juuri: AmpariJuuri + uusin.json:n polku, tai AmpariJuuri (kehityspeili).</summary>
        string paketinJuuri = AmpariJuuri;

        double? pysaytettyT;
        string pakotettuTila;
        int pakotettuTaso = -1;
        DioraamaNakyma? viimeNakyma;

        public DioraamaSovitin(LinssiOhjain o, PalloKierto kierto)
        {
            this.o = o;
            this.kierto = kierto;
            nakymaPeitto = () => avoinna;
        }

        /// <summary>Koko ruudun näkymäpeitto (SyoteLukko): tosi, kun linssi on auki.</summary>
        readonly Func<bool> nakymaPeitto;

        public LinssiTiedot Tiedot => linssi.Tiedot;
        public bool Auki => linssi.Auki;

        public void Avaa(ILinssiYmparisto ymparisto)
        {
            y = ymparisto;
            avoinna = true;
            pallonKamera = kierto != null ? kierto.GetComponent<Camera>() : null;
            // Pallo piiloon talon omalla näkymäpeitolla (kuten koko ruudun lehti): PalloKierto.Peitetty → Ruudunpaivitys
            // sammuttaa pallon kameran, eikä kehysmittari laske peitettyjä kehyksiä lepoon.
            SyoteLukko.LisaaNakymaPeitto(nakymaPeitto);
            if (kierto != null) SyoteLukko.Esta(this);

            ymparisto.Pelikerrokset(false);
            ymparisto.MusiikkiPitoon(true);
            // ERA 2: dioraama väistää maiseman taustaäänen (Maisema väistyy) -- omat silmukat (DioraamaAanet)
            // korvaavat sen. Palautus (jos tarvitaan) Sulje:ssa; kukaan muu ei aseta Taustaaania linssin auki
            // ollessa, koska tunnus on yksinomaan avoinna olevan linssin oma (ks. ILinssiYmparisto.Taustaaani).
            ymparisto.Taustaaani(null);
            ymparisto.Peite(true);
            o.StartCoroutine(PeiteHetkeksi(0.3f));

            if (nayttamo == null) nayttamo = DioraamaNayttamo.Luo(pallonKamera);
            AktiivinenKamera = nayttamo.Kamera;
            if (rakennus3D == null) rakennus3D = new DioraamaRakennus(nayttamo.transform);
            if (hahmot3D == null) hahmot3D = new DioraamaHahmot(nayttamo.transform);
            if (syote == null) syote = new DioraamaSyote(this, nayttamo);
            if (aanet == null) aanet = new DioraamaAanet(o, this);
            aanet.Avaa(ymparisto, rakennus, nayttamo.transform);

            Linssi = linssi;
            Vaihtui?.Invoke(linssi);

            if (rakennus == null)
            {
                if (!latausKaynnissa) { latausKaynnissa = true; o.StartCoroutine(LataaRakennus()); }
            }
            else
            {
                linssi.Avaa(rakennus, ymparisto.Aika);
                TaydennaLataamattomat();
                TaydennaPinnatJaLiekit();
            }
            o.Kirjaa(Tilaraportti());
        }

        public void Paivita()
        {
            if (!avoinna || y == null || !linssi.Auki) return;
            double t = pysaytettyT ?? y.Aika;
            bool pysty = y.Kuvasuhde < 1.0;
            var nakyma = linssi.NakymaHetkella(t, pysty);
            if (pakotettuTila != null && pakotettuTaso >= 0 && nakyma.Tasot != null) nakyma.Tasot[pakotettuTila] = pakotettuTaso;
            viimeNakyma = nakyma;
            ViimeisinNakyma = nakyma;
            ViimeisinT = t;

            var kameraAsento = syote.Sovita(nakyma.Kamera);
            // t mukaan (era 2): DioraamaNayttamo.Paivita antaa sen liekkinäkymälle (DioraamaLiekit.Paivita, ruutu
            // ajasta) -- nayttamo-kentän kommentti kutsui juuri tätä ("Sovitin voi jatkossa antaa Ydin-ajan tähän").
            nayttamo.Paivita(kameraAsento, y.VahennettyLiike, t);
            hahmot3D.Paivita(rakennus, nakyma, nayttamo.Kamera, t);
            syote.Paivita(rakennus, t);
            aanet?.Paivita(rakennus, nakyma, t);
        }

        public void Sulje()
        {
            linssi.Sulje();
            rakennus3D?.Tyhjenna(); rakennus3D = null;
            hahmot3D?.Tyhjenna(); hahmot3D = null;
            nayttamo?.Tuhoa(); nayttamo = null;
            AktiivinenKamera = null;
            syote = null;
            aanet?.Sulje(); // kahvat kiinni ja puhuja pois; aanet ITSE säilyy (klippivälimuisti), ks. kentän kommentti.
            SyoteLukko.PoistaNakymaPeitto(nakymaPeitto);
            if (kierto != null) SyoteLukko.Vapauta(this);
            y?.Pelikerrokset(true);
            y?.MusiikkiPitoon(false);
            y?.Taustaaani(null); // palautus (ks. Avaa): ei jätetä muuta arvoa roikkumaan, vaikka aanet ei sitä asettanutkaan.
            avoinna = false;
            pysaytettyT = null;
            pakotettuTila = null;
            pakotettuTaso = -1;
            viimeNakyma = null;
            ViimeisinNakyma = null;
            Linssi = null;
            Vaihtui?.Invoke(null);
        }

        /// <summary>Kohdistus (napautus tilan AABB:hen, "poikki tila"/"poikki yleis" -komennot): nollaa pelaajan vedon/nipistyksen.</summary>
        public void Kohdista(string tilaId, double t)
        {
            linssi.Kohdista(tilaId, t);
            syote?.NollaaPoikkeama();
        }

        public void Yleisnakymaan(double t) => Kohdista(null, t);

        /// <summary>Äänen URL (era 2, DioraamaAanet.cs): sama juuri ja peili kuin muu paketti (rakennus.json, glb,
        /// atlakset) -- Rakennus.Aanet[id].Tiedosto on suhteessa rakennuksen juureen (dioraama-rajapinnat-
        /// era2-20260929.md kohta 2 "AANET").</summary>
        public string AaniUrl(string tiedostoRelPolku) =>
            string.IsNullOrEmpty(tiedostoRelPolku) ? null : peili(paketinJuuri + tiedostoRelPolku);

        IEnumerator PeiteHetkeksi(float sekuntia)
        {
            yield return new WaitForSecondsRealtime(sekuntia);
            if (avoinna) y?.Peite(false);
        }

        // --- lataus -----------------------------------------------------------------------------------------

        IEnumerator LataaRakennus()
        {
            string uusin = null;
            yield return HaeTeksti(peili(AmpariJuuri + "uusin.json"), t => uusin = t);
            paketinJuuri = AmpariJuuri;
            if (uusin != null)
            {
                try
                {
                    var o = Matkakirja.Peli.MiniJson.Jasenna(uusin) as Dictionary<string, object>;
                    string polku = o != null && o.TryGetValue("polku", out var p) ? p as string : null;
                    if (!string.IsNullOrEmpty(polku)) paketinJuuri = AmpariJuuri + polku.TrimEnd('/') + "/";
                }
                catch (Exception e) { o.Kirjaa("poikki: uusin.json: " + e.Message); }
            }
            string json = null;
            yield return HaeTeksti(peili(paketinJuuri + "rakennus.json"), t => json = t);
            latausKaynnissa = false;
            if (json == null) { o.Kirjaa("poikki: rakennus.json ei latautunut"); yield break; }
            try { rakennus = DioraamaData.Lue(json); }
            catch (Exception e) { o.Kirjaa("poikki: rakennus.json jäsennys: " + e.Message); yield break; }
            if (rakennus?.Tilat == null) { o.Kirjaa("poikki: rakennus.json ilman tiloja"); yield break; }
            o.Kirjaa($"poikki: {rakennus.Nimi} ladattu, {rakennus.Tilat.Count} tilaa, juuri {paketinJuuri}");
            if (avoinna)
            {
                linssi.Avaa(rakennus, y.Aika);
                aanet?.RakennusValmis(rakennus); // rakennus oli null Avaa-kutsun hetkellä: äänet saavat sen vasta nyt.
                TaydennaLataamattomat();
                TaydennaPinnatJaLiekit();
            }
        }

        /// <summary>Jonottaa lataamatta olevat tilat (glb) ja hahmoatlakset yksi kerrallaan (ei rinnakkaisia hakuja).</summary>
        void TaydennaLataamattomat()
        {
            foreach (var tila in rakennus.Tilat)
            {
                if (tilatJonossaTaiValmiit.Contains(tila.Id)) continue;
                tilatJonossaTaiValmiit.Add(tila.Id);
                o.StartCoroutine(LataaTila(tila));
                hahmot3D.LisaaTila(rakennus, tila, o.Kirjaa);
                aanet?.TilaValmis(tila); // esilataa tilan tehosteet ja puheäänet (era 2).
                // ERA 2 -LISÄYS (ei ollut kirjaimellisesti tehtävänannon tiedostokohdan listalla, mutta välttämätön):
                // DioraamaLiekit on rakennettu DioraamaHahmot-mallilla -- LisaaTila luo liekkien GameObjectit
                // paikka/koko-tiedosta, eikä mikään muu kutsu sitä. Ilman tätä liekit eivät koskaan ilmesty
                // näyttämölle, vaikka atlas latautuisi. HUOM (raportoitu, ei tämän erän tiedosto): DioraamaLiekit.
                // TarvittavatAtlakset/AtlasMateriaali käyttävät liekki.Atlas (polku) avaimena atlasKuvat/
                // atlasMateriaalit-sanakirjoihin, mutta AsetaAtlas(liekkiId, …) kirjoittaa liekkiId:llä -- nämä eivät
                // täsmää. Siksi tässä ei käytetä TarvittavatAtlakset-reittiä, vaan rakennustason latausta (alla,
                // TaydennaPinnatJaLiekit), joka on itsenäisesti johdonmukainen dokumentoidun AsetaAtlas-signatuurin
                // kanssa.
                nayttamo.Liekit?.LisaaTila(rakennus, tila, o.Kirjaa);
                var atlakset = new List<string>();
                hahmot3D.TarvittavatAtlakset(rakennus, tila, atlakset);
                foreach (var atlas in atlakset)
                {
                    if (atlaksetJonossaTaiValmiit.Contains(atlas)) continue;
                    atlaksetJonossaTaiValmiit.Add(atlas);
                    o.StartCoroutine(LataaAtlas(atlas));
                }
            }
        }

        /// <summary>Jonottaa rakennustason pintatekstuurit (Rakennus.Pinnat) ja liekkiatlakset (Rakennus.Liekit) --
        /// era 2, ei tilakohtaista suodatusta (ks. kenttien alkukommentti). Kutsutaan aina TaydennaLataamattomat-
        /// kutsun rinnalla; HashSetit estävät saman pinnan/liekin lataamisen kahdesti.</summary>
        void TaydennaPinnatJaLiekit()
        {
            foreach (var pinta in rakennus.Pinnat.Values)
            {
                if (string.IsNullOrEmpty(pinta.Tekstuuri) || pinnatJonossaTaiValmiit.Contains(pinta.Id)) continue;
                pinnatJonossaTaiValmiit.Add(pinta.Id);
                o.StartCoroutine(LataaPinta(pinta.Id, pinta.Tekstuuri));
            }
            foreach (var liekki in rakennus.Liekit.Values)
            {
                if (string.IsNullOrEmpty(liekki.Atlas) || liekkiatlaksetJonossaTaiValmiit.Contains(liekki.Id)) continue;
                liekkiatlaksetJonossaTaiValmiit.Add(liekki.Id);
                o.StartCoroutine(LataaLiekkiAtlas(liekki.Id, liekki.Atlas));
            }
        }

        IEnumerator LataaTila(Tila tila)
        {
            if (string.IsNullOrEmpty(tila.GlbTiedosto)) { o.Kirjaa($"poikki: {tila.Id} ilman glb-tiedostoa"); yield break; }
            byte[] tavut = null;
            yield return HaeTavut(peili(paketinJuuri + tila.GlbTiedosto), t => tavut = t);
            if (tavut == null) { o.Kirjaa($"poikki: {tila.Id} glb ei latautunut (tila jää puuttumaan)"); yield break; }
            if (rakennus3D.LisaaTila(rakennus, tila, tavut, o.Kirjaa)) o.Kirjaa($"poikki: {tila.Id} valmis ({rakennus3D.Kolmiot} kolmiota yhteensä)");
        }

        IEnumerator LataaAtlas(string atlasPolku)
        {
            byte[] tavut = null;
            yield return HaeTavut(peili(paketinJuuri + atlasPolku), t => tavut = t);
            if (tavut == null) { o.Kirjaa($"poikki: atlas {atlasPolku} ei latautunut (hahmo harmaana)"); yield break; }
            var kuva = new Texture2D(2, 2, TextureFormat.RGBA32, true) { name = atlasPolku, filterMode = FilterMode.Bilinear, wrapMode = TextureWrapMode.Clamp };
            if (!kuva.LoadImage(tavut, false)) { o.Kirjaa($"poikki: atlas {atlasPolku} ei jäsentynyt (hahmo harmaana)"); UnityEngine.Object.Destroy(kuva); yield break; }
            hahmot3D.AsetaAtlas(atlasPolku, kuva);
            o.Kirjaa($"poikki: atlas {atlasPolku} valmis ({kuva.width}x{kuva.height})");
        }

        /// <summary>Pinnan Tekstuuri (era 2 kohta 3): mipmapattu, ei-lineaarinen (sRGB-lähde), toistuva ja
        /// anisotrooppinen -- kutsuu rakennusnäkymän (Sovittimen rakennus3D-kenttä, sama reitti kuin LataaTila)
        /// AsetaPinta-metodia (agentti D:n lisäys DioraamaRakennus.cs:ään).</summary>
        IEnumerator LataaPinta(string pintaId, string tekstuuriPolku)
        {
            byte[] tavut = null;
            yield return HaeTavut(peili(paketinJuuri + tekstuuriPolku), t => tavut = t);
            if (tavut == null) { o.Kirjaa($"poikki: pinta {pintaId} ei latautunut (paikkaväri)"); yield break; }
            var kuva = new Texture2D(2, 2, TextureFormat.RGBA32, true, false)
            { name = "Pinta:" + pintaId, filterMode = FilterMode.Trilinear, wrapMode = TextureWrapMode.Repeat, anisoLevel = 4 };
            if (!kuva.LoadImage(tavut, false)) { o.Kirjaa($"poikki: pinta {pintaId} ei jäsentynyt (paikkaväri)"); UnityEngine.Object.Destroy(kuva); yield break; }
            ladatutPinnat[pintaId] = kuva;
            rakennus3D.AsetaPinta(pintaId, kuva);
            o.Kirjaa($"poikki: pinta {pintaId} tekstuuri valmis ({kuva.width}x{kuva.height})");
        }

        /// <summary>Liekkipankin (Rakennus.Liekit) atlas (era 2 kohta 3): kuten hahmoatlas (Clamp/Bilinear) --
        /// kutsuu näyttämön Liekit-näkymän (agentti E:n DioraamaNayttamo.Liekit-kenttä/-ominaisuus, uusi
        /// DioraamaLiekit-luokka) AsetaAtlas-metodia. OLETUS (kirjattu raporttiin): nimi "Liekit" on tehtävän-
        /// annon esimerkki, ei vahvistettu -- jos agentti E päätyy toiseen nimeen, tämä rivi ei käänny.</summary>
        IEnumerator LataaLiekkiAtlas(string liekkiId, string atlasPolku)
        {
            byte[] tavut = null;
            yield return HaeTavut(peili(paketinJuuri + atlasPolku), t => tavut = t);
            if (tavut == null) { o.Kirjaa($"poikki: liekki {liekkiId} atlas ei latautunut (näkymättä)"); yield break; }
            var kuva = new Texture2D(2, 2, TextureFormat.RGBA32, true)
            { name = "Liekki:" + liekkiId, filterMode = FilterMode.Bilinear, wrapMode = TextureWrapMode.Clamp };
            if (!kuva.LoadImage(tavut, false)) { o.Kirjaa($"poikki: liekki {liekkiId} atlas ei jäsentynyt (näkymättä)"); UnityEngine.Object.Destroy(kuva); yield break; }
            ladatutLiekkiAtlakset[liekkiId] = kuva;
            nayttamo?.Liekit?.AsetaAtlas(atlasPolku, kuva);
            o.Kirjaa($"poikki: liekki {liekkiId} atlas valmis ({kuva.width}x{kuva.height})");
        }

        static IEnumerator HaeTeksti(string url, Action<string> valmis)
        {
            using var p = UnityWebRequest.Get(url);
            p.timeout = 20;
            yield return p.SendWebRequest();
            valmis(p.result == UnityWebRequest.Result.Success ? p.downloadHandler.text : null);
        }

        static IEnumerator HaeTavut(string url, Action<byte[]> valmis)
        {
            using var p = UnityWebRequest.Get(url);
            p.timeout = 30;
            yield return p.SendWebRequest();
            valmis(p.result == UnityWebRequest.Result.Success ? p.downloadHandler.data : null);
        }

        // --- testikomento "poikki …" --------------------------------------------------------------------------

        public void Komento(string[] osat)
        {
            string mita = osat.Length > 1 ? osat[1] : "tila";
            string arvo = osat.Length > 2 ? osat[2] : null;
            if (mita == "peili")
            {
                if (arvo == null || arvo == "pois") { peili = s => s; peiliKuvaus = "pois (ämpäri)"; }
                else
                {
                    string uusiJuuri = arvo;
                    peili = s => s.StartsWith(AmpariJuuri, StringComparison.Ordinal) ? uusiJuuri.TrimEnd('/') + "/" + s.Substring(AmpariJuuri.Length) : s;
                    peiliKuvaus = uusiJuuri;
                }
                o.Kirjaa("poikki: peili " + peiliKuvaus);
                return;
            }
            if (mita == "lataa")
            {
                rakennus = null; latausKaynnissa = false;
                tilatJonossaTaiValmiit.Clear(); atlaksetJonossaTaiValmiit.Clear();
                pinnatJonossaTaiValmiit.Clear(); liekkiatlaksetJonossaTaiValmiit.Clear();
                foreach (var vanhaKuva in ladatutPinnat.Values) if (vanhaKuva != null) UnityEngine.Object.Destroy(vanhaKuva);
                ladatutPinnat.Clear();
                foreach (var vanhaKuva in ladatutLiekkiAtlakset.Values) if (vanhaKuva != null) UnityEngine.Object.Destroy(vanhaKuva);
                ladatutLiekkiAtlakset.Clear();
                rakennus3D?.Tyhjenna(); hahmot3D?.Tyhjenna();
                if (avoinna) { latausKaynnissa = true; o.StartCoroutine(LataaRakennus()); }
                o.Kirjaa("poikki: lataa uudelleen");
                return;
            }
            if (mita == "dof")
            {
                DioraamaNayttamo.DofPaalla = arvo == "1";
                o.Kirjaa("poikki: dof " + (DioraamaNayttamo.DofPaalla ? "päällä" : "pois"));
                return;
            }
            if (mita == "hehku")
            {
                // Hehku (Bloom, erä 2) on nayttamo-instanssin ominaisuus (ei staattinen kuten DofPaalla): jos
                // linssi on kiinni (nayttamo == null), kytkin ei säily seuraavaan avaukseen -- poikkeama raportoitu.
                if (nayttamo != null) nayttamo.Hehku = arvo == "1";
                o.Kirjaa("poikki: hehku " + (arvo == "1" ? "päällä" : "pois"));
                return;
            }
            if (mita == "aanet")
            {
                // A/B-kehityskytkin (era 2) + tilaraportti ("poikki aanet"): ladatut klipit, silmukat, puhuja.
                if (aanet == null) { o.Kirjaa("poikki: äänet eivät ole valmiit (linssiä ei ole avattu kertaakaan)"); return; }
                if (arvo == "0" || arvo == "1")
                {
                    aanet.Paalla = arvo == "1";
                    o.Kirjaa("poikki: äänet " + (arvo == "1" ? "päällä" : "pois"));
                }
                else o.Kirjaa(aanet.Tilaraportti());
                return;
            }
            if (!avoinna) { o.Kirjaa("poikki: linssi ei ole auki (linssi poikkileikkaus)"); return; }
            // rakennus.json (ja siis Ydin-linssin Avaa) voi olla vielä lataamatta: PoikkileikkausLinssi.Kohdista
            // lukee Rakennus-kentän suoraan eikä tarkista nulliä (AsentoFor → Rakennus.YleisVaaka).
            if (rakennus == null) { o.Kirjaa("poikki: rakennus.json ei ole vielä ladattu"); return; }
            double t = pysaytettyT ?? y.Aika;
            if (mita == "yleis") Kohdista(null, t);
            else if (mita == "tila" && arvo != null)
            {
                if (rakennus.Tila(arvo) == null) { o.Kirjaa("poikki: tuntematon tila " + arvo); return; }
                Kohdista(arvo, t);
            }
            else if (mita == "aika") pysaytettyT = (arvo == null || arvo == "pois") ? (double?)null : Luku(arvo);
            else if (mita == "taso" && arvo != null && osat.Length > 3) { pakotettuTila = arvo; pakotettuTaso = (int)Luku(osat[3]); }
            else if (mita == "napauta") linssi.Napauta(t);
            else if (mita == "mittaus") { o.Kirjaa(Mittausraportti()); return; }
            else if (mita != "tila") { o.Kirjaa("poikki: tuntematon " + mita); return; }
            o.Kirjaa(Tilaraportti());
        }

        static double Luku(string s) => double.Parse(s.Replace(',', '.'), CultureInfo.InvariantCulture);

        string Tilaraportti()
        {
            if (!avoinna) return "poikki: kiinni";
            if (rakennus == null) return "poikki: lataa" + (latausKaynnissa ? "…" : "");
            string kohde = viimeNakyma?.KohdeTila ?? "yleisnäkymä";
            return $"poikki: {rakennus.Nimi}, kohde {kohde}, tiloja {rakennus3D.TilojaLadattu}/{rakennus.Tilat.Count}, " +
                   $"hahmoja {hahmot3D.Maara}, peili {peiliKuvaus}, aika {(pysaytettyT.HasValue ? pysaytettyT.Value.ToString("F1", CultureInfo.InvariantCulture) : "elää")}";
        }

        string Mittausraportti()
        {
            var kamera = nayttamo != null ? nayttamo.Kamera : null;
            string asento = kamera != null
                ? $"paikka ({kamera.transform.position.x:F1}, {kamera.transform.position.y:F1}, {kamera.transform.position.z:F1}), fov {kamera.fieldOfView:F0}°"
                : "-";
            // ERA 2: pintojen ja liekkien tekstuurimuisti lisätään hahmoatlaksien arvioon (Profiler antaa todellisen
            // GPU-koon mipmapit mukaan lukien; hahmoatlas ei tässä sovittimessa ole omistuksessamme, joten sen oma
            // TekstuuriTavuja()-arvio pysyy ennallaan w·h·4-approksimaationa).
            long uusienTavuja = 0;
            foreach (var t in ladatutPinnat.Values) uusienTavuja += TekstuuriTavuja(t);
            foreach (var t in ladatutLiekkiAtlakset.Values) uusienTavuja += TekstuuriTavuja(t);
            double tekstuuriMt = ((hahmot3D?.TekstuuriTavuja() ?? 0) + uusienTavuja) / (1024.0 * 1024.0);
            return $"poikki mittaus: tiloja {rakennus3D?.TilojaLadattu ?? 0}/{rakennus?.Tilat?.Count ?? 0}, kolmioita {rakennus3D?.Kolmiot ?? 0}, " +
                   $"kärkiä {rakennus3D?.Karjet ?? 0}, rendereitä {(rakennus3D?.Renderereita ?? 0) + (hahmot3D?.Maara ?? 0)}, " +
                   $"materiaaleja {(rakennus3D?.Materiaaleja ?? 0) + (hahmot3D?.AtlaksiaLadattu ?? 0)}, tekstuurimuisti (arvio) {tekstuuriMt:F1} Mt, kamera {asento}";
        }

        /// <summary>GPU-tekstuurimuisti (Profiler antaa todellisen koon mipmapit/pakkaus mukaan lukien; era 2 kohta 3
        /// mainitsee tämän tai käsinlasketun w·h·4·1,33-arvion -- Profiler on tarkempi kun se on saatavilla).</summary>
        static long TekstuuriTavuja(Texture2D t) => t != null ? Profiler.GetRuntimeMemorySizeLong(t) : 0;
    }
}
