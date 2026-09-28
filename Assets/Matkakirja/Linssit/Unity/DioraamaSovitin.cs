// DIORAAMA-SOVITIN: Poikkileikkaus-linssin Unity-kytkentä (Linnanrakentaja, erä 1, 29.9.2026; MaapallonVuosiSovitin-
// malli). Ydin (Matkakirja.Linssit.Dioraama.PoikkileikkausLinssi, A3) ei tunne Unitya: tämä sovitin lataa
// rakennus.json + glb + atlas-tekstuurit, pitää DioraamaNayttamo/DioraamaRakennus/DioraamaHahmot/DioraamaSyote-
// oliot ja syöttää ajan (t = ymparisto.Aika) Ytimelle joka kehys. Katso dioraama-rajapinnat-20260929.md kohta 6.
//
// KEHITYSPEILI: oletuksena PÄÄLLÄ (poikkeaa vuosi-linssin identiteettioletuksesta), koska ämpärissä
// (https://media.matkakirja.app/dioraama/olavinlinna/) ei vielä ole sisältöä — juuri ohjautuu oletuksena
// paikalliseen dist-kansioon (task-annettu polku). "poikki peili pois" palauttaa oikean ämpärin.
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
// "Nakyma" on kahdessa nimiavaruudessa (Matkakirja.Linssit.Nakyma = pallon lat/lon-asento,
// Matkakirja.Linssit.Dioraama.Nakyma = dioraaman NakymaHetkella-tulos): alias poistaa CS0104-ristiriidan.
using DioraamaNakyma = Matkakirja.Linssit.Dioraama.Nakyma;

namespace Matkakirja.Natiivi
{
    public sealed class DioraamaSovitin : ILinssi
    {
        public const string AmpariJuuri = "https://media.matkakirja.app/dioraama/olavinlinna/";
        /// <summary>Oletuspeili kehitykseen (task-annettu polku): ämpärissä ei vielä ole erän 1 sisältöä.</summary>
        public const string OletusPeiliJuuri = "file:///Users/Shared/Claude/wt/linnanrakentaja-keittio/dist/dioraama/olavinlinna/";

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

        Rakennus rakennus;
        bool avoinna, latausKaynnissa;
        readonly HashSet<string> tilatJonossaTaiValmiit = new HashSet<string>(StringComparer.Ordinal);
        readonly HashSet<string> atlaksetJonossaTaiValmiit = new HashSet<string>(StringComparer.Ordinal);
        string peiliKuvaus = "kehitys (oletus)";
        Func<string, string> peili = OletusPeiliFunktio;

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

        static string OletusPeiliFunktio(string s) =>
            s.StartsWith(AmpariJuuri, StringComparison.Ordinal) ? OletusPeiliJuuri + s.Substring(AmpariJuuri.Length) : s;

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
            ymparisto.Peite(true);
            o.StartCoroutine(PeiteHetkeksi(0.3f));

            if (nayttamo == null) nayttamo = DioraamaNayttamo.Luo(pallonKamera);
            AktiivinenKamera = nayttamo.Kamera;
            if (rakennus3D == null) rakennus3D = new DioraamaRakennus(nayttamo.transform);
            if (hahmot3D == null) hahmot3D = new DioraamaHahmot(nayttamo.transform);
            if (syote == null) syote = new DioraamaSyote(this, nayttamo);

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
            nayttamo.Paivita(kameraAsento, y.VahennettyLiike);
            hahmot3D.Paivita(rakennus, nakyma, nayttamo.Kamera, t);
            syote.Paivita(rakennus, t);
        }

        public void Sulje()
        {
            linssi.Sulje();
            rakennus3D?.Tyhjenna(); rakennus3D = null;
            hahmot3D?.Tyhjenna(); hahmot3D = null;
            nayttamo?.Tuhoa(); nayttamo = null;
            AktiivinenKamera = null;
            syote = null;
            SyoteLukko.PoistaNakymaPeitto(nakymaPeitto);
            if (kierto != null) SyoteLukko.Vapauta(this);
            y?.Pelikerrokset(true);
            y?.MusiikkiPitoon(false);
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

        IEnumerator PeiteHetkeksi(float sekuntia)
        {
            yield return new WaitForSecondsRealtime(sekuntia);
            if (avoinna) y?.Peite(false);
        }

        // --- lataus -----------------------------------------------------------------------------------------

        IEnumerator LataaRakennus()
        {
            string json = null;
            yield return HaeTeksti(peili(AmpariJuuri + "rakennus.json"), t => json = t);
            latausKaynnissa = false;
            if (json == null) { o.Kirjaa("poikki: rakennus.json ei latautunut"); yield break; }
            try { rakennus = DioraamaData.Lue(json); }
            catch (Exception e) { o.Kirjaa("poikki: rakennus.json jäsennys: " + e.Message); yield break; }
            if (rakennus?.Tilat == null) { o.Kirjaa("poikki: rakennus.json ilman tiloja"); yield break; }
            o.Kirjaa($"poikki: {rakennus.Nimi} ladattu, {rakennus.Tilat.Count} tilaa");
            if (avoinna)
            {
                linssi.Avaa(rakennus, y.Aika);
                TaydennaLataamattomat();
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

        IEnumerator LataaTila(Tila tila)
        {
            if (string.IsNullOrEmpty(tila.GlbTiedosto)) { o.Kirjaa($"poikki: {tila.Id} ilman glb-tiedostoa"); yield break; }
            byte[] tavut = null;
            yield return HaeTavut(peili(AmpariJuuri + tila.GlbTiedosto), t => tavut = t);
            if (tavut == null) { o.Kirjaa($"poikki: {tila.Id} glb ei latautunut (tila jää puuttumaan)"); yield break; }
            if (rakennus3D.LisaaTila(rakennus, tila, tavut, o.Kirjaa)) o.Kirjaa($"poikki: {tila.Id} valmis ({rakennus3D.Kolmiot} kolmiota yhteensä)");
        }

        IEnumerator LataaAtlas(string atlasPolku)
        {
            byte[] tavut = null;
            yield return HaeTavut(peili(AmpariJuuri + atlasPolku), t => tavut = t);
            if (tavut == null) { o.Kirjaa($"poikki: atlas {atlasPolku} ei latautunut (hahmo harmaana)"); yield break; }
            var kuva = new Texture2D(2, 2, TextureFormat.RGBA32, true) { name = atlasPolku, filterMode = FilterMode.Bilinear, wrapMode = TextureWrapMode.Clamp };
            if (!kuva.LoadImage(tavut, false)) { o.Kirjaa($"poikki: atlas {atlasPolku} ei jäsentynyt (hahmo harmaana)"); UnityEngine.Object.Destroy(kuva); yield break; }
            hahmot3D.AsetaAtlas(atlasPolku, kuva);
            o.Kirjaa($"poikki: atlas {atlasPolku} valmis ({kuva.width}x{kuva.height})");
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
                rakennus3D?.Tyhjenna(); hahmot3D?.Tyhjenna();
                if (avoinna) { latausKaynnissa = true; o.StartCoroutine(LataaRakennus()); }
                o.Kirjaa("poikki: lataa uudelleen");
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
            double tekstuuriMt = (hahmot3D?.TekstuuriTavuja() ?? 0) / (1024.0 * 1024.0);
            return $"poikki mittaus: tiloja {rakennus3D?.TilojaLadattu ?? 0}/{rakennus?.Tilat?.Count ?? 0}, kolmioita {rakennus3D?.Kolmiot ?? 0}, " +
                   $"kärkiä {rakennus3D?.Karjet ?? 0}, rendereitä {(rakennus3D?.Renderereita ?? 0) + (hahmot3D?.Maara ?? 0)}, " +
                   $"materiaaleja {(rakennus3D?.Materiaaleja ?? 0) + (hahmot3D?.AtlaksiaLadattu ?? 0)}, tekstuurimuisti (arvio) {tekstuuriMt:F1} Mt, kamera {asento}";
        }
    }
}
