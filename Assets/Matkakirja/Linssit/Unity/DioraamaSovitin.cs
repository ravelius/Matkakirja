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
// taso <tila> <0-2> | napauta | lataa | mittaus | tila | dof <0|1> | hehku <0|1> | aanet [0|1] | drift <0|1> |
// hahmot <2d|3d>" (LinssiOhjain.Komento reitittää "poikki"-alkuiset tänne). drift = Leijunta (era 2b, kohta 5,
// agentti P5): hidas ajelehtiminen levossa, oletus pois. hahmot = 3D-pienoisfiguuri vs. 2D-kortti (era 2b
// kohta 4, agentti P4b), oletus 3d.
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
        /// <summary>Saapumiskaari odottaa kuorta: DioraamaTaulu piilottaa Pulun ja taulun (Päätoimittaja 30.9.: pelkkä hämärä järvi).</summary>
        public static bool SaapumisOdotus { get; private set; }
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
        // alkukommentti) -- klippivälimuisti säilyy sulkemisen ja uudelleenavaamisen yli. HUOM (UUDELLEENAVAUS-
        // korjaus 29.9.2026, katselmointi): ladatutPinnat/ladatutLiekkiAtlakset EIVÄT enää säily samoin --
        // NollaaNakymanLataukset tyhjentää nekin Sulje:ssa, koska rakennus3D/hahmot3D/nayttamo tuhotaan samalla
        // eikä uusi näyttämö koskaan täyttyisi, jos latausjonot muistaisivat vanhan kerran "valmiiksi".
        DioraamaAanet aanet;

        Rakennus rakennus;
        bool avoinna, latausKaynnissa;
        /// <summary>Kasvaa joka Sulje/"poikki lataa" -kutsulla (NollaaNakymanLataukset): kesken olevat
        /// latauskorutiinit (LataaTila/LataaAtlas/LataaPinta/LataaLiekkiAtlas) tunnistavat tästä palatessaan
        /// yield-lauseesta, että niiden kohdenäkymä on vanhentunut, ja perääntyvät kirjoittamatta siihen.</summary>
        int avauskerta;
        readonly HashSet<string> tilatJonossaTaiValmiit = new HashSet<string>(StringComparer.Ordinal);
        readonly HashSet<string> atlaksetJonossaTaiValmiit = new HashSet<string>(StringComparer.Ordinal);
        /// <summary>Era 2b (kohta 4, ali-agentti P4b): 3D-hahmojen glb-polut, sama dedup-malli kuin
        /// atlaksetJonossaTaiValmiit (avain glb-polku, ei henkilö-id — ks. DioraamaHahmot3D.TarvittavatGlb).</summary>
        readonly HashSet<string> hahmoGlbJonossaTaiValmiit = new HashSet<string>(StringComparer.Ordinal);
        // ERA 2 (dioraama-rajapinnat-era2-20260929.md kohta 3): pintojen tekstuurit ja liekkien atlakset ovat
        // rakennustason (ei tilakohtaista) dataa, jo rakennuskoneen esisuodattamia "käytettyjä" (kohta 2) --
        // siksi ei tarvita DioraamaHahmot.TarvittavatAtlakset-tyylistä tila-suodatusta, ks. TaydennaPinnatJaLiekit.
        readonly HashSet<string> pinnatJonossaTaiValmiit = new HashSet<string>(StringComparer.Ordinal);
        readonly HashSet<string> liekkiatlaksetJonossaTaiValmiit = new HashSet<string>(StringComparer.Ordinal);
        /// <summary>Sovittimen itse lataamat pinta-/liekkitekstuurit ("poikki mittaus" -muistiraportti); avain on
        /// pinnan/liekin id, ei tiedostopolku (toisin kuin hahmoatlaksissa, joissa monta henkilöä voisi jakaa polun).</summary>
        readonly Dictionary<string, Texture2D> ladatutPinnat = new Dictionary<string, Texture2D>(StringComparer.Ordinal);
        readonly Dictionary<string, Texture2D> ladatutLiekkiAtlakset = new Dictionary<string, Texture2D>(StringComparer.Ordinal);
        /// <summary>Olavinlinna: tilojen leivotut valoatlakset (avain tilan id), sama omistus kuin pinnoilla.</summary>
        readonly Dictionary<string, Texture2D> ladatutValoAtlakset = new Dictionary<string, Texture2D>(StringComparer.Ordinal);
        string peiliKuvaus = "pois (ämpäri)";
        Func<string, string> peili = s => s;
        bool peiliHttps;
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
            // Kehittäjän kuoritason vaihto (komento tai DioraamaTaulun nappi) lataa kuoren uudelleen, jos linssi on auki.
            DioraamaUlkokuori.PakotusVaihtui += () => { if (avoinna && rakennus != null) LataaUlkokuori(); };
            // Tunnelman vaihto: kuori ja jo ladattujen tilojen atlakset uudelleen oikealla versiolla.
            DioraamaTunnelma.Vaihtui += () =>
            {
                if (!avoinna || rakennus == null) return;
                LataaUlkokuori();
                foreach (var t in rakennus.Tilat)
                    if (!string.IsNullOrEmpty(t.ValoAtlas) && rakennus3D != null && rakennus3D.SisaltaaTilan(t.Id)) o.StartCoroutine(LataaValoAtlas(t));
            };
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
                linssi.Avaa(rakennus, ymparisto.Aika, SaapuminenNahty);
                TaydennaLataamattomat();
                TaydennaPinnatJaLiekit();
                LataaUlkokuori();
                AloitaKuoriOdotus(ymparisto.Aika);
            }
            o.Kirjaa(Tilaraportti());
        }

        public void Paivita()
        {
            // rakennus == null: "poikki lataa" kesken (1.0.54-ajossa DioraamaAanet.Paivita kaatui NullReferenceen).
            if (!avoinna || y == null || !linssi.Auki || rakennus == null) return;
            double t = pysaytettyT ?? y.Aika;
            // Laajat kuvat sovitetaan todelliseen kuvasuhteeseen: näyttämön kameran oma (kuvan) suhde, ei ympäristön arvo
            // (1.1 (79) vaaka: kierron jälkeen sovitus käytti vielä pystyn suhdetta ja linna jäi pieneksi).
            float kameranSuhde = nayttamo.Kamera != null ? nayttamo.Kamera.aspect : 0f;
            linssi.Kuvasuhde = kameranSuhde > 0.05f ? kameranSuhde : y.Kuvasuhde;
            if (nayttamo.Ulkokuori?.Pohja is { } po) linssi.AsetaPohja(po.minX, po.maxX, po.minZ, po.maxZ);
            if (kuoriOdotusAlku >= 0f)
            {
                float odotettu = Time.realtimeSinceStartup - kuoriOdotusAlku;
                bool kuoriValmis = nayttamo.Ulkokuori?.Lahitaso != null;
                if (kuoriValmis || odotettu > KuoriOdotusMax || rakennus.Ulkokuori == null)
                {
                    kuoriOdotusAlku = -1f;
                    nayttamo.Odota(false);
                    linssi.Avaa(rakennus, y.Aika, SaapuminenNahty); // kaari alusta tästä hetkestä
                    t = pysaytettyT ?? y.Aika;
                    o.Kirjaa($"poikki: saapuminen alkaa ({(kuoriValmis ? "kuori valmis" : "kuori ei ehtinyt")}, odotettiin {odotettu:F1} s)");
                }
                else { nayttamo.Odota(true); t = kuoriOdotusT; }
            }
            SaapumisOdotus = kuoriOdotusAlku >= 0f;
            bool pysty = linssi.Kuvasuhde < 1.0; // kameran oma suhde (ks. yllä)
            if (paluuPyydetty) { paluuPyydetty = false; Yleisnakymaan(t); }
            if (pyydettyTila != null) { string pt = pyydettyTila; pyydettyTila = null; if (rakennus?.Tila(pt) != null) Kohdista(pt, t); }
            var nakyma = linssi.NakymaHetkella(t, pysty);
            // Elävä linna: saapumiskaaren eteneminen → soihtujen syttyminen; kaari nähty → seuraavalla kerralla lyhyt.
            if (rakennus.Saapuminen != null)
            {
                double osuus = linssi.SaapuminenOsuus(t);
                nayttamo.Liekit?.Syttyminen(osuus, DioraamaNayttamo.UnityPiste((pysty ? rakennus.YleisPysty : rakennus.YleisVaaka).Kohde));
                if (osuus >= 1 && !SaapuminenNahty) SaapuminenNahty = true;
                // Uusi linna: kertojan kierroksen aikana ei elävien kohteiden sykkeitä (1.1 (73) -kuva: renkaat jaksojen päällä).
                nayttamo.Syke?.Paivita(rakennus, nakyma.KohdeTila == null && osuus >= 1 && nakyma.KertojaJakso < 0 && !linssi.KertojaKaynnissa(t), nakyma.KohdeTila != null, t, y.VahennettyLiike);
                // Etsintä: vaihe näkyy vasta perillä tilassa (ei kesken lennon).
                bool perilla = nakyma.KohdeTila != null && linssi.LeikkausHetkella(t).osuus >= 1;
                nayttamo.Etsinta?.Paivita(rakennus, perilla ? nakyma.KohdeTila : null, t, y.VahennettyLiike);
            }
            if (pakotettuTila != null && pakotettuTaso >= 0 && nakyma.Tasot != null) nakyma.Tasot[pakotettuTila] = pakotettuTaso;
            viimeNakyma = nakyma;
            ViimeisinNakyma = nakyma;
            ViimeisinT = t;

            var kameraAsento = pakotettuKamera ?? syote.Sovita(nakyma.Kamera);
            // t mukaan (era 2): DioraamaNayttamo.Paivita antaa sen liekkinäkymälle (DioraamaLiekit.Paivita, ruutu
            // ajasta) -- nayttamo-kentän kommentti kutsui juuri tätä ("Sovitin voi jatkossa antaa Ydin-ajan tähän").
            nayttamo.Paivita(kameraAsento, y.VahennettyLiike, t);
            hahmot3D.Paivita(rakennus, nakyma, nayttamo.Kamera, t);
            // era 2b kohta 4 (ali-agentti P4b): 3D-pienoisfiguurit -- SAMAAN kohtaan kuin vanha 2D-hahmot3D
            // yllä, mutta Nayttamon omistama (ks. DioraamaNayttamo.cs:n Hahmot3D-kommentti).
            nayttamo.Hahmot3D?.Paivita(rakennus, nakyma, t);
            // Olavinlinna: kuoren leikkausikkuna kohdistetun tilan kohdalle (kasvaa kaarilennon jälkipuoliskolla).
            nayttamo.Ulkokuori?.PaivitaLeikkaus(rakennus, linssi.LeikkausHetkella(t), nayttamo.Kamera);
            syote.Paivita(rakennus, t);
            aanet?.Paivita(rakennus, nakyma, t);
        }

        public void Sulje()
        {
            linssi.Sulje();
            kuoriOdotusAlku = -1f; SaapumisOdotus = false; // näyttämö (ja sen odotuspiilotus) tuhoutuu alla
            rakennus3D?.Tyhjenna(); rakennus3D = null;
            hahmot3D?.Tyhjenna(); hahmot3D = null;
            nayttamo?.Tuhoa(); nayttamo = null;
            AktiivinenKamera = null;
            syote = null;
            aanet?.Sulje(); // kahvat kiinni ja puhuja pois; aanet ITSE säilyy (klippivälimuisti), ks. kentän kommentti.
            // UUDELLEENAVAUS (löydös, katselmointi 29.9.2026): ilman tätä tilatJonossaTaiValmiit jne. muistaisivat
            // edellisen (juuri tuhotun) näyttämön lataukset valmiiksi tehdyiksi, eikä uusi rakennus3D/hahmot3D/
            // Liekit koskaan täyttyisi toisella avauksella.
            NollaaNakymanLataukset();
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

        /// <summary>Elävä linna: UI:n ‹-nappi (DioraamaTaulu) pyytää paluuta yleisnäkymään; toteutetaan seuraavassa Paivitassa.</summary>
        public static void PyydaPaluu() => paluuPyydetty = true;
        static bool paluuPyydetty;

        /// <summary>Linnan valikon Huoneet-lista (omistaja 2.10. 14.44): siirtyy tilaan seuraavassa Paivitassa.</summary>
        public static void PyydaTila(string tilaId) => pyydettyTila = tilaId;
        static string pyydettyTila;

        /// <summary>Äänen URL (era 2, DioraamaAanet.cs): Rakennus.Aanet[id].Tiedosto on suhteessa RAKENNUKSEN
        /// JUUREEN eli uusin.json:n kansioon (AmpariJuuri), EI hash-kansioon (dioraama-rajapinnat-era2-20260929.md
        /// kohta 1 ja 2 "AANET": äänet asuvat ämpärissä polussa dioraama/&lt;r&gt;/aanet/v&lt;versio&gt;/). Peili-ajossa
        /// juuret ovat samat. Löydös 29.9. PEILI=pois-ajosta: paketinJuuri antoi 404 kaikille äänille.</summary>
        public string AaniUrl(string tiedostoRelPolku) =>
            string.IsNullOrEmpty(tiedostoRelPolku) ? null
            // "/…" = median juuresta (Pelikoodarin mikseristemit aanet/mikseri/v1/ ovat ämpärin juuressa, 30.9.2026),
            // "https://…" sellaisenaan; muuten rakennuksen juuresta kuten ennen.
            : tiedostoRelPolku.StartsWith("https://", StringComparison.Ordinal) ? tiedostoRelPolku
            : tiedostoRelPolku.StartsWith("/", StringComparison.Ordinal) ? MediaJuuri + tiedostoRelPolku
            // https-peili (ämpärin hash-kansio, puhdas kuittaus ennen osoitinta): äänet eivät ole hash-kansiossa vaan
            // rakennuksen juuressa kuten tuotannossa (1.10.: kuittausajojen 145 äänen 404:ää) → peiliä ei käytetä.
            : peiliHttps ? AmpariJuuri + tiedostoRelPolku
            : peili(AmpariJuuri + tiedostoRelPolku);
        const string MediaJuuri = "https://media.matkakirja.app";

        IEnumerator PeiteHetkeksi(float sekuntia)
        {
            yield return new WaitForSecondsRealtime(sekuntia);
            if (avoinna) y?.Peite(false);
        }

        // --- lataus -----------------------------------------------------------------------------------------

        /// <summary>Tyhjentää tämän avauskerran latausjonot/-välimuistit (Sulje ja "poikki lataa"): UUDELLEENAVAUS-
        /// löydös (katselmointi 29.9.2026) -- ilman tätä tilatJonossaTaiValmiit jne. muistaisivat edellisen kerran
        /// lataukset "valmiiksi", eikä toisen avauksen tuore rakennus3D/hahmot3D/Liekit koskaan täyttyisi.
        /// avauskerta kasvaa aina kutsulla: kesken olevat latauskorutiinit (LataaTila/LataaAtlas/LataaPinta/
        /// LataaLiekkiAtlas) tunnistavat vanhentuneen kertansa palatessaan yield-lauseesta ja perääntyvät
        /// kirjoittamatta mihinkään (ei NullReferenceä, ei kirjoitusta vanhaan/väärään näyttämöön).</summary>
        void NollaaNakymanLataukset()
        {
            avauskerta++;
            tilatJonossaTaiValmiit.Clear();
            atlaksetJonossaTaiValmiit.Clear();
            hahmoGlbJonossaTaiValmiit.Clear();
            pinnatJonossaTaiValmiit.Clear();
            liekkiatlaksetJonossaTaiValmiit.Clear();
            foreach (var vanhaKuva in ladatutPinnat.Values) if (vanhaKuva != null) UnityEngine.Object.Destroy(vanhaKuva);
            ladatutPinnat.Clear();
            foreach (var vanhaKuva in ladatutLiekkiAtlakset.Values) if (vanhaKuva != null) UnityEngine.Object.Destroy(vanhaKuva);
            ladatutLiekkiAtlakset.Clear();
            foreach (var vanhaKuva in ladatutValoAtlakset.Values) if (vanhaKuva != null) UnityEngine.Object.Destroy(vanhaKuva);
            ladatutValoAtlakset.Clear();
        }

        IEnumerator LataaRakennus()
        {
            string uusin = null;
            yield return HaeTeksti(peili(AmpariJuuri + "uusin.json"), t => uusin = t);
            paketinJuuri = AmpariJuuri;
            DioraamaLevyvalimuisti.Aseta(AmpariJuuri, null);
            if (uusin != null)
            {
                try
                {
                    var o = Matkakirja.Peli.MiniJson.Jasenna(uusin) as Dictionary<string, object>;
                    string polku = o != null && o.TryGetValue("polku", out var p) ? p as string : null;
                    if (!string.IsNullOrEmpty(polku))
                    {
                        paketinJuuri = AmpariJuuri + polku.TrimEnd('/') + "/";
                        DioraamaLevyvalimuisti.Aseta(AmpariJuuri, polku.Trim('/'));
                    }
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
                linssi.Avaa(rakennus, y.Aika, SaapuminenNahty);
                aanet?.RakennusValmis(rakennus); // rakennus oli null Avaa-kutsun hetkellä: äänet saavat sen vasta nyt.
                TaydennaLataamattomat();
                TaydennaPinnatJaLiekit();
                LataaUlkokuori();
                AloitaKuoriOdotus(y.Aika);
            }
        }

        // Saapumiskaari odottaa kevyttä kuorta (enintään KuoriOdotusMax s): 1.0.64-puhdasajossa kaaren 3. sekunnilla
        // kuorta ei vielä ollut ja harmaat tilapalikat näkyivät veden päällä. Odotuksen ajan aika on jäädytetty kaaren
        // alkuun (kamera kaukana järvellä), ja näyttämö piilottaa kaiken paitsi veden (DioraamaNayttamo.Odota).
        const float KuoriOdotusMax = 10f;
        float kuoriOdotusAlku = -1f;
        double kuoriOdotusT;

        void AloitaKuoriOdotus(double t)
        {
            kuoriOdotusAlku = -1f;
            if (rakennus?.Saapuminen == null || rakennus.Ulkokuori == null || nayttamo?.Ulkokuori == null) return;
            if (nayttamo.Ulkokuori.Lahitaso != null) return;
            kuoriOdotusAlku = Time.realtimeSinceStartup; kuoriOdotusT = t;
        }

        const string SaapuminenAvain = "dioraama-saapuminen-nahty";
        /// <summary>Elävä linna: toisella käynnillä saapumiskaari on lyhyt (Saapuminen.Lyhyt), kehittäjä nollaa
        /// "poikki saapuminen alusta".</summary>
        static bool SaapuminenNahty
        {
            get => PlayerPrefs.GetInt(SaapuminenAvain, 0) == 1;
            set { PlayerPrefs.SetInt(SaapuminenAvain, value ? 1 : 0); PlayerPrefs.Save(); }
        }

        /// <summary>Olavinlinna: ulkokuori valitulla laatutasolla (DioraamaUlkokuori), jos paketissa on kuori.</summary>
        void LataaUlkokuori()
        {
            nayttamo?.AsetaTunnelma(DioraamaTunnelma.Hamara(rakennus));
            if (rakennus?.Ulkokuori == null || nayttamo?.Ulkokuori == null) return;
            o.StartCoroutine(nayttamo.Ulkokuori.Lataa(rakennus.Ulkokuori, s => peili(paketinJuuri + s), o.Kirjaa, DioraamaTunnelma.Hamara(rakennus)));
            // Boat Attack -järvi aina kuoren kanssa (Päätoimittaja 1.10.: vesi toimii myös ilman ympäristöpakettia, tuotannossa v17);
            // maasto, puut, horisontti ja syvyyskartta vain, kun paketissa on ympäristö (#3749 jälkeen). Maalattu järvi vain,
            // jos näyttämöllä ei ole ympäristöä (varjostin puuttuu tms.).
            if (nayttamo.Ymparisto != null)
            {
                nayttamo.Ulkokuori.LisaaVesi(null, 0, 1);
                var kuori = nayttamo.Ulkokuori;
                o.StartCoroutine(nayttamo.Ymparisto.Lataa(rakennus.Ymparisto ?? new Ymparisto(), (float)rakennus.Ulkokuori.VesiY, s => peili(paketinJuuri + s), o.Kirjaa,
                    () => kuori == null || kuori.Lahitaso != null));
                return;
            }
            // Järvi kuoren alle rakennuksen omalla "vesi"-pinnalla (Lataa tyhjentää vanhan ensin, joten tämä sen jälkeen).
            double toisto = rakennus.Pinnat != null && rakennus.Pinnat.TryGetValue("vesi", out var vp) && vp.ToistoU > 0 ? vp.ToistoU : 8;
            nayttamo.Ulkokuori.LisaaVesi(rakennus3D?.PinnanMateriaali(rakennus, "vesi"), (float)rakennus.Ulkokuori.VesiY, (float)toisto);
        }

        /// <summary>Kevyt Tila-kopio, jonka Hahmot-lista suodattaa POIS henkilöt, joilla ON malli3d.glb JA
        /// DioraamaHahmot3D.Paalla on päällä (era 2b kohta 4, ali-agentti P4b: "3D-hahmo korvaa kortin").
        /// Vanha 2D-DioraamaHahmot (ei muokattu tässä erässä) ei tiedä mitään 3D-malleista, niin suodatus
        /// tehdään TÄSSÄ, ennen sen LisaaTila/TarvittavatAtlakset-kutsuja. Muut Tila-kentät (paitsi Id/Hahmot)
        /// jäävät oletukseen -- turvallista, koska DioraamaHahmot.cs lukee vain näitä kahta (tarkistettu).</summary>
        Tila SuodataHahmot3dPois(Tila tila)
        {
            if (!DioraamaHahmot3D.Paalla || tila.Hahmot == null) return tila;
            List<Hahmo> jaljelle = null;
            foreach (var hahmo in tila.Hahmot)
            {
                bool onMalli3d = rakennus.Henkilot != null && rakennus.Henkilot.TryGetValue(hahmo.HenkiloId, out var henkilo)
                    && !string.IsNullOrEmpty(henkilo.Malli3d?.Glb);
                if (!onMalli3d) (jaljelle ??= new List<Hahmo>()).Add(hahmo);
            }
            if (jaljelle != null && jaljelle.Count == tila.Hahmot.Count) return tila; // ei yhtään suodatettavaa
            return new Tila { Id = tila.Id, Hahmot = jaljelle ?? new List<Hahmo>() };
        }

        /// <summary>Jonottaa lataamatta olevat tilat (glb) ja hahmoatlakset yksi kerrallaan (ei rinnakkaisia hakuja).</summary>
        void TaydennaLataamattomat()
        {
            foreach (var tila in rakennus.Tilat)
            {
                if (tilatJonossaTaiValmiit.Contains(tila.Id)) continue;
                tilatJonossaTaiValmiit.Add(tila.Id);
                o.StartCoroutine(LataaTila(tila));
                var tila2d = SuodataHahmot3dPois(tila);
                hahmot3D.LisaaTila(rakennus, tila2d, o.Kirjaa);
                // era 2b kohta 4 (ali-agentti P4b): 3D-pienoisfiguurit, alkuperäisellä (suodattamattomalla)
                // tila-oliolla -- DioraamaHahmot3D.LisaaTila suodattaa ITSE (Malli3d.Glb + Paalla), sama
                // Nayttamo-omistus/elinkaari kuin Liekit/Valot (ks. DioraamaNayttamo.cs).
                nayttamo.Hahmot3D?.LisaaTila(rakennus, tila, o.Kirjaa);
                aanet?.TilaValmis(tila); // esilataa tilan tehosteet ja puheäänet (era 2).
                // ERA 2 -LISÄYS (ei ollut kirjaimellisesti tehtävänannon tiedostokohdan listalla, mutta välttämätön):
                // DioraamaLiekit on rakennettu DioraamaHahmot-mallilla -- LisaaTila luo liekkien GameObjectit
                // paikka/koko-tiedosta, eikä mikään muu kutsu sitä. Ilman tätä liekit eivät koskaan ilmesty
                // näyttämölle, vaikka atlas latautuisi. Siksi tässä ei käytetä TarvittavatAtlakset-reittiä, vaan
                // rakennustason latausta (alla, TaydennaPinnatJaLiekit), joka avaimistaa atlaksen polulla
                // (liekki.Atlas) samoin kuin AsetaAtlas-signatuuri (korjattu 29.9.2026, katselmointi: vanha koodi
                // deduplikoi liekki.Id:llä, vaikka monta liekkimääritystä voi jakaa yhden atlas-tiedoston).
                nayttamo.Liekit?.LisaaTila(rakennus, tila, o.Kirjaa);
                var atlakset = new List<string>();
                hahmot3D.TarvittavatAtlakset(rakennus, tila2d, atlakset);
                foreach (var atlas in atlakset)
                {
                    if (atlaksetJonossaTaiValmiit.Contains(atlas)) continue;
                    atlaksetJonossaTaiValmiit.Add(atlas);
                    o.StartCoroutine(LataaAtlas(atlas));
                }
                var hahmoGlbt = new List<string>();
                nayttamo.Hahmot3D?.TarvittavatGlb(rakennus, tila, hahmoGlbt);
                foreach (var glb in hahmoGlbt)
                {
                    if (hahmoGlbJonossaTaiValmiit.Contains(glb)) continue;
                    hahmoGlbJonossaTaiValmiit.Add(glb);
                    o.StartCoroutine(LataaHahmoGlb(glb));
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
                // Puolikas pienelle laitteelle (era 2b, tekstuurimuisti 29.9.2026, ks. PieniLaite) --
                // vanha paketti ilman TekstuuriPuolia putoaa aina täyteen (ei virhe, ks. Pinta-kommentti).
                bool puoli = PieniLaite() && !string.IsNullOrEmpty(pinta.TekstuuriPuoli);
                o.StartCoroutine(LataaPinta(pinta.Id, puoli ? pinta.TekstuuriPuoli : pinta.Tekstuuri, puoli));
            }
            foreach (var liekki in rakennus.Liekit.Values)
            {
                // Deduplikointi ATLAKSEN POLULLA (ei liekki.Id): monta liekkimääritystä voi jakaa saman
                // atlas-tiedoston, ja AsetaAtlas itsekin avaimistaa polulla (korjattu 29.9.2026, katselmointi).
                if (string.IsNullOrEmpty(liekki.Atlas) || liekkiatlaksetJonossaTaiValmiit.Contains(liekki.Atlas)) continue;
                liekkiatlaksetJonossaTaiValmiit.Add(liekki.Atlas);
                o.StartCoroutine(LataaLiekkiAtlas(liekki.Atlas));
            }
        }

        IEnumerator LataaTila(Tila tila)
        {
            int kerta = avauskerta;
            if (string.IsNullOrEmpty(tila.GlbTiedosto)) { o.Kirjaa($"poikki: {tila.Id} ilman glb-tiedostoa"); yield break; }
            byte[] tavut = null;
            yield return HaeTavut(peili(paketinJuuri + tila.GlbTiedosto), t => tavut = t);
            if (tavut == null) { o.Kirjaa($"poikki: {tila.Id} glb ei latautunut (tila jää puuttumaan)"); yield break; }
            // UUDELLEENAVAUS (löydös 29.9.2026): linssi on voitu sulkea/avata uudelleen latauksen aikana --
            // rakennus3D on silloin joko tuhottu (null) tai uuden avauskerran tuore instanssi. Kirjoitus siihen
            // olisi vanhentunutta tietoa tai NullReferenceä, joten perääntytään hiljaa.
            if (kerta != avauskerta || rakennus3D == null) yield break;
            if (!rakennus3D.LisaaTila(rakennus, tila, tavut, o.Kirjaa)) yield break;
            o.Kirjaa($"poikki: {tila.Id} valmis ({rakennus3D.Kolmiot} kolmiota yhteensä)");
            // Olavinlinna (Siirtoseppä 29.9.2026): Blenderin tyhjät → 3D-liekit ja savu; leivottu valoatlas.
            var tyhjat = rakennus3D.Tyhjat(tila.Id);
            if (tyhjat.Count > 0 && rakennus3D.Tilat.TryGetValue(tila.Id, out var tilaGo) && tilaGo != null)
            {
                foreach (var t in tyhjat)
                    if (t.Laji == "liekki") nayttamo?.Liekit?.LisaaTyhja(tila.Id, t, tilaGo.transform.TransformPoint(t.Paikka), o.Kirjaa);
                nayttamo?.Savu?.LisaaTila(tila.Id, tilaGo.transform, tyhjat, o.Kirjaa);
                nayttamo?.Ikkunat?.LisaaTila(tila.Id, tilaGo.transform, tyhjat, o.Kirjaa);
                nayttamo?.Lokit?.LisaaTila(tila.Id, tilaGo.transform, tyhjat, o.Kirjaa);
                foreach (var t in tyhjat)
                    if (t.Laji == "valo") nayttamo?.Valot?.LisaaTyhja(tila.Id, t, tilaGo.transform.TransformPoint(t.Paikka));
            }
            if (!string.IsNullOrEmpty(tila.ValoAtlas)) yield return LataaValoAtlas(tila);
            // Elävä linna: tilan irtoesineet (arkun kansi, sinetti) etsintää varten.
            if (tila.Esineet.Count > 0 && nayttamo?.Etsinta != null)
                yield return nayttamo.Etsinta.LataaEsineet(rakennus, tila, s => peili(paketinJuuri + s), o.Kirjaa);
        }

        /// <summary>Tilan leivottu valoatlas (Blender Cycles, Linnanrakentaja): puolikas (2k) pienelle laitteelle kuten
        /// pinnoilla (PieniLaite), muuten täysi (4k). sRGB, mipmapit, Clamp; Compress(false) pakkaa GPU-muotoon.
        /// Virhe ei kaada linssiä: tila jää harmaaksi (varjostimen "grey").</summary>
        IEnumerator LataaValoAtlas(Tila tila)
        {
            int kerta = avauskerta;
            // Hämärä (DioraamaTunnelma): tilan hämäräatlas, jos paketissa; muuten päiväversio.
            bool hamara = DioraamaTunnelma.Hamara(rakennus) && !string.IsNullOrEmpty(tila.HamaraAtlas);
            string atlas = hamara ? tila.HamaraAtlas : tila.ValoAtlas, atlasPuoli = hamara ? tila.HamaraAtlasPuoli : tila.ValoAtlasPuoli;
            string astcTaysi = hamara ? tila.HamaraAtlasAstc : tila.ValoAtlasAstc, astcPuoliP = hamara ? tila.HamaraAtlasAstcPuoli : tila.ValoAtlasAstcPuoli;
            bool puoli = PieniLaite() && !string.IsNullOrEmpty(atlasPuoli);
            string polku = puoli ? atlasPuoli : atlas;
            // ASTC-mipketju ensin (valoatlas.astc / astcPuoli), JPEG varalla.
            string astcPolku = puoli ? astcPuoliP : astcTaysi;
            if (!string.IsNullOrEmpty(astcPolku))
            {
                byte[] astcTavut = null;
                yield return HaeTavut(peili(paketinJuuri + astcPolku), t => astcTavut = t);
                var astc = DioraamaAstc.Lue(astcTavut, "Valoatlas:" + tila.Id + ":astc", out string astcSyy);
                if (kerta != avauskerta || rakennus3D == null) { if (astc != null) UnityEngine.Object.Destroy(astc); yield break; }
                if (astc != null)
                {
                    if (ladatutValoAtlakset.TryGetValue(tila.Id, out var vanhaA) && vanhaA != null && vanhaA != astc) UnityEngine.Object.Destroy(vanhaA);
                    ladatutValoAtlakset[tila.Id] = astc;
                    rakennus3D.AsetaValoAtlas(tila.Id, astc);
                    o.Kirjaa($"poikki: valoatlas {tila.Id} valmis ({astc.width}x{astc.height} {astc.format}{(puoli ? ", puolikas" : "")})");
                    yield break;
                }
                o.Kirjaa($"poikki: valoatlas {tila.Id} ASTC ei käytössä ({astcSyy ?? "ei latautunut"}), JPEG varalla");
            }
            byte[] tavut = null;
            yield return HaeTavut(peili(paketinJuuri + polku), t => tavut = t);
            if (tavut == null) { o.Kirjaa($"poikki: valoatlas {polku} ei latautunut (tila harmaana)"); yield break; }
            var kuva = new Texture2D(2, 2, TextureFormat.RGBA32, true, false)
            { name = "Valoatlas:" + tila.Id, filterMode = FilterMode.Trilinear, wrapMode = TextureWrapMode.Clamp, anisoLevel = 2 };
            if (!kuva.LoadImage(tavut, false)) { o.Kirjaa($"poikki: valoatlas {polku} ei jäsentynyt (tila harmaana)"); UnityEngine.Object.Destroy(kuva); yield break; }
            kuva.Compress(false);
            if (kerta != avauskerta || rakennus3D == null) { UnityEngine.Object.Destroy(kuva); yield break; } // ks. LataaTila-kommentti
            if (ladatutValoAtlakset.TryGetValue(tila.Id, out var vanha) && vanha != null && vanha != kuva) UnityEngine.Object.Destroy(vanha); // tunnelman vaihto
            ladatutValoAtlakset[tila.Id] = kuva;
            rakennus3D.AsetaValoAtlas(tila.Id, kuva);
            o.Kirjaa($"poikki: valoatlas {tila.Id} valmis ({kuva.width}x{kuva.height}{(puoli ? ", puolikas" : "")})");
        }

        IEnumerator LataaAtlas(string atlasPolku)
        {
            int kerta = avauskerta;
            byte[] tavut = null;
            yield return HaeTavut(peili(paketinJuuri + atlasPolku), t => tavut = t);
            if (tavut == null) { o.Kirjaa($"poikki: atlas {atlasPolku} ei latautunut (hahmo harmaana)"); yield break; }
            var kuva = new Texture2D(2, 2, TextureFormat.RGBA32, true) { name = atlasPolku, filterMode = FilterMode.Bilinear, wrapMode = TextureWrapMode.Clamp };
            if (!kuva.LoadImage(tavut, false)) { o.Kirjaa($"poikki: atlas {atlasPolku} ei jäsentynyt (hahmo harmaana)"); UnityEngine.Object.Destroy(kuva); yield break; }
            if (kerta != avauskerta || hahmot3D == null) { UnityEngine.Object.Destroy(kuva); yield break; } // ks. LataaTila-kommentti
            hahmot3D.AsetaAtlas(atlasPolku, kuva);
            o.Kirjaa($"poikki: atlas {atlasPolku} valmis ({kuva.width}x{kuva.height})");
        }

        /// <summary>3D-pienoisfiguurin glb (era 2b kohta 4, ali-agentti P4b): sama LataaTila-malli, mutta
        /// yksi glb per HENKILÖ (ei per tila) -- DioraamaGlb.Lue(unityyn:true) peilaa Unityyn samassa kutsussa
        /// kuin rakennus3D:n LataaTila. Virhe (verkko/jäsennys) EI kaada linssiä: 3D-hahmo jää puuttumaan (ks.
        /// DioraamaHahmot3D.cs:n Esiintyma-kommentti "kortti on varalla" -poikkeamasta).</summary>
        IEnumerator LataaHahmoGlb(string glbPolku)
        {
            int kerta = avauskerta;
            byte[] tavut = null;
            yield return HaeTavut(peili(paketinJuuri + glbPolku), t => tavut = t);
            if (tavut == null) { o.Kirjaa($"poikki: hahmo3d {glbPolku} ei latautunut (hahmo puuttuu)"); yield break; }
            GlbMalli malli;
            try { malli = DioraamaGlb.Lue(tavut, true); }
            catch (Exception e) { o.Kirjaa($"poikki: hahmo3d {glbPolku} virhe: {e.Message}"); yield break; }
            if (kerta != avauskerta || nayttamo?.Hahmot3D == null) yield break; // ks. LataaTila-kommentti
            nayttamo.Hahmot3D.AsetaGlb(glbPolku, malli);
            o.Kirjaa($"poikki: hahmo3d {glbPolku} valmis ({malli.Solmut.Count} solmua)");
        }

        /// <summary>Pinnan Tekstuuri/TekstuuriPuoli (era 2 kohta 3, puolikas era 2b): mipmapattu, ei-lineaarinen
        /// (sRGB-lähde), toistuva ja anisotrooppinen -- kutsuu rakennusnäkymän (Sovittimen rakennus3D-kenttä,
        /// sama reitti kuin LataaTila) AsetaPinta-metodia (agentti D:n lisäys DioraamaRakennus.cs:ään).
        /// Compress(false) pakkaa GPU-muotoon (iOS: ETC/EAC-perhe, Unityn dokumentaatio) latauksen jälkeen --
        /// pienentää tekstuurimuistia edelleen RGBA32:sta, highQuality-parametri ei vaikuta ETC:hen.</summary>
        IEnumerator LataaPinta(string pintaId, string tekstuuriPolku, bool puoli)
        {
            int kerta = avauskerta;
            byte[] tavut = null;
            yield return HaeTavut(peili(paketinJuuri + tekstuuriPolku), t => tavut = t);
            if (tavut == null) { o.Kirjaa($"poikki: pinta {pintaId} ei latautunut (paikkaväri)"); yield break; }
            var kuva = new Texture2D(2, 2, TextureFormat.RGBA32, true, false)
            { name = "Pinta:" + pintaId, filterMode = FilterMode.Trilinear, wrapMode = TextureWrapMode.Repeat, anisoLevel = 4 };
            if (!kuva.LoadImage(tavut, false)) { o.Kirjaa($"poikki: pinta {pintaId} ei jäsentynyt (paikkaväri)"); UnityEngine.Object.Destroy(kuva); yield break; }
            kuva.Compress(false);
            if (kerta != avauskerta || rakennus3D == null) { UnityEngine.Object.Destroy(kuva); yield break; } // ks. LataaTila-kommentti
            ladatutPinnat[pintaId] = kuva;
            rakennus3D.AsetaPinta(pintaId, kuva);
            o.Kirjaa($"poikki: pinta {pintaId} tekstuuri valmis ({kuva.width}x{kuva.height}{(puoli ? ", puolikas" : "")})");
        }

        /// <summary>Liekkipankin (Rakennus.Liekit) atlas (era 2 kohta 3): kuten hahmoatlas (Clamp/Bilinear) --
        /// kutsuu näyttämön Liekit-näkymän AsetaAtlas-metodia. Dedupikoitu ja välimuistissa ATLAKSEN POLULLA
        /// (ei liekki.Id, ks. kutsupaikan kommentti TaydennaPinnatJaLiekit:ssä).</summary>
        IEnumerator LataaLiekkiAtlas(string atlasPolku)
        {
            int kerta = avauskerta;
            byte[] tavut = null;
            yield return HaeTavut(peili(paketinJuuri + atlasPolku), t => tavut = t);
            if (tavut == null) { o.Kirjaa($"poikki: liekkiatlas {atlasPolku} ei latautunut (näkymättä)"); yield break; }
            var kuva = new Texture2D(2, 2, TextureFormat.RGBA32, true)
            { name = "Liekki:" + atlasPolku, filterMode = FilterMode.Bilinear, wrapMode = TextureWrapMode.Clamp };
            if (!kuva.LoadImage(tavut, false)) { o.Kirjaa($"poikki: liekkiatlas {atlasPolku} ei jäsentynyt (näkymättä)"); UnityEngine.Object.Destroy(kuva); yield break; }
            if (kerta != avauskerta || nayttamo?.Liekit == null) { UnityEngine.Object.Destroy(kuva); yield break; } // ks. LataaTila-kommentti
            ladatutLiekkiAtlakset[atlasPolku] = kuva;
            nayttamo.Liekit.AsetaAtlas(atlasPolku, kuva);
            o.Kirjaa($"poikki: liekkiatlas {atlasPolku} valmis ({kuva.width}x{kuva.height})");
        }

        static IEnumerator HaeTeksti(string url, Action<string> valmis)
        {
            using var p = UnityWebRequest.Get(url);
            p.timeout = 20;
            yield return p.SendWebRequest();
            valmis(p.result == UnityWebRequest.Result.Success ? p.downloadHandler.text : null);
        }

        // Hash-paketin tiedostot levyvälimuistin kautta. Aikakatkaisu 120 s: 1.0.61:n Blender-paketin 22 Mt:n
        // ASTC-atlakset eivät ehtineet 30 sekunnissa mobiiliverkossa.
        static IEnumerator HaeTavut(string url, Action<byte[]> valmis) => DioraamaLevyvalimuisti.Hae(url, 120, valmis);

        // --- testikomento "poikki …" --------------------------------------------------------------------------

        public void Komento(string[] osat)
        {
            string mita = osat.Length > 1 ? osat[1] : "tila";
            string arvo = osat.Length > 2 ? osat[2] : null;
            if (mita == "peili")
            {
                peiliHttps = false;
                if (arvo == null || arvo == "pois") { peili = s => s; peiliKuvaus = "pois (ämpäri)"; }
                else
                {
                    peiliHttps = arvo.StartsWith("https://", StringComparison.Ordinal);
                    string uusiJuuri = arvo;
                    peili = s => s.StartsWith(AmpariJuuri, StringComparison.Ordinal) ? uusiJuuri.TrimEnd('/') + "/" + s.Substring(AmpariJuuri.Length) : s;
                    peiliKuvaus = uusiJuuri;
                }
                o.Kirjaa("poikki: peili " + peiliKuvaus);
                return;
            }
            // "poikki saapuminen alusta": seuraava avaus näyttää täyden saapumiskaaren (kehittäjä, kuvaukset).
            if (mita == "etsinta")
            {
                if (arvo == "alusta") DioraamaEtsinta.Nollaa(rakennus);
                else if (arvo == "seuraava") o.Kirjaa("poikki: etsintä seuraava " + (nayttamo?.Etsinta?.Suorita(rakennus) == true ? "suoritettu" : "ei aktiivista vaihetta tässä tilassa"));
                o.Kirjaa("poikki: etsintä " + DioraamaEtsinta.Tila(rakennus));
                return;
            }
            if (mita == "vihje")
            {
                if (arvo == "alusta") DioraamaSyke.Nahty = false;
                o.Kirjaa($"poikki: vihje {(DioraamaSyke.Nahty ? "nähty" : "näytetään")}");
                return;
            }
            if (mita == "saapuminen")
            {
                if (arvo == "alusta") SaapuminenNahty = false;
                o.Kirjaa($"poikki: saapuminen {(SaapuminenNahty ? "nähty (lyhyt)" : "täysi")}, osuus {(Linssi != null ? Linssi.SaapuminenOsuus(y?.Aika ?? 0).ToString("F2", CultureInfo.InvariantCulture) : "-")}");
                return;
            }
            // "poikki tunnelma [paiva|hamara|auto]": päivä / iltahämärä (kehittäjä, muistetaan; auto = rakennuksen oletus).
            if (mita == "tunnelma")
            {
                if (arvo != null) DioraamaTunnelma.Pakotettu = arvo == "hamara" ? true : arvo == "paiva" ? false : (bool?)null;
                o.Kirjaa($"poikki: tunnelma {(DioraamaTunnelma.Hamara(rakennus) ? "hämärä" : "päivä")} ({(DioraamaTunnelma.Pakotettu.HasValue ? "pakotettu" : "rakennuksen oletus " + (rakennus?.Tunnelma ?? "paiva"))})");
                return;
            }
            // "poikki mikseri 1|0 | kaiku lyhyt|pitka|pois|<0…1>": mikseritilan testaus ilman AaniMikseri-paneelia (30.9.2026).
            if (mita == "mikseri")
            {
                if (arvo == "1" || arvo == "0") DioraamaAanet.MikseriTila = arvo == "1";
                else if (arvo == "kaiku" && osat.Length > 3)
                {
                    string k = osat[3];
                    if (k == "pois") DioraamaAanet.KaikuPois = true;
                    else if (k == "lyhyt" || k == "pitka") { DioraamaAanet.KaikuPois = false; DioraamaAanet.KaikunPituus = k; }
                    else if (float.TryParse(k.Replace(',', '.'), NumberStyles.Float, CultureInfo.InvariantCulture, out var kt))
                        DioraamaAanet.KaikuKerroin[DioraamaAanet.NykyinenHuone ?? ""] = kt;
                }
                o.Kirjaa($"poikki: mikseri {(DioraamaAanet.MikseriTila ? "päällä" : "pois")}, kaiku {(DioraamaAanet.KaikuPois ? "pois" : DioraamaAanet.KaikunPituus)}, huone {DioraamaAanet.NykyinenHuone ?? "(yleis)"}");
                return;
            }
            // "poikki kamera <atsimuutti> <korkeus> <etäisyys> [fov] [x y z] | pois": kiinteä kamera kuvauksiin (vesi, ympäristö).
            if (mita == "kamera")
            {
                if (arvo == null || arvo == "pois") pakotettuKamera = null;
                else if (osat.Length > 4)
                {
                    Matkakirja.Linssit.Dioraama.V3 kohde = osat.Length > 8 ? new Matkakirja.Linssit.Dioraama.V3(Luku(osat[6]), Luku(osat[7]), Luku(osat[8])) : rakennus != null ? rakennus.YleisVaaka.Kohde : new Matkakirja.Linssit.Dioraama.V3(0, 0, 0);
                    pakotettuKamera = new Matkakirja.Linssit.Dioraama.Asento(kohde, Luku(osat[2]), Luku(osat[3]), Luku(osat[4]), osat.Length > 5 ? Luku(osat[5]) : 40, 0.3);
                }
                o.Kirjaa("poikki: kamera " + (pakotettuKamera.HasValue ? $"{pakotettuKamera.Value.Atsimuutti:F0}° {pakotettuKamera.Value.Korkeus:F0}° {pakotettuKamera.Value.Etaisyys:F0} m" : "pois"));
                return;
            }
            // "poikki aluskasvit 0|1": linnan aluskasvit piiloon/näkyviin (Linssiseppä 2, 1.10., kuvapari samasta kohdasta).
            if (mita == "aluskasvit")
            {
                if (arvo == "lajit" && osat.Length > 3)
                {
                    DioraamaAluskasvit.VainLajit = osat[3] == "kaikki" ? null
                        : new HashSet<int>(System.Linq.Enumerable.Where(System.Linq.Enumerable.Select(osat[3].Split(','), x => int.TryParse(x, out int n) ? n : -1), n => n >= 0));
                    o.Kirjaa($"poikki: aluskasvit lajit {osat[3]} (seuraava lataus)"); return;
                }
                if (arvo == "osat" && osat.Length > 3) { DioraamaAluskasvit.Osiin = osat[3] != "0"; o.Kirjaa($"poikki: aluskasvit osiin {DioraamaAluskasvit.Osiin} (seuraava lataus)"); return; }
                o.Kirjaa("poikki: " + DioraamaAluskasvit.Kytke(arvo != "0"));
                return;
            }
            // "poikki vesi [heijastus 0|1|auto]": järven planaariheijastus (Boat Attack -vesi, 1.10.2026) ja ympäristön tila.
            if (mita == "vesi")
            {
                if (arvo == "syvyys" && osat.Length > 3) DioraamaYmparisto.SyvyysPaalla = osat[3] != "0";
                if (arvo == "heijastus" && osat.Length > 3)
                    DioraamaYmparisto.HeijastusPakotettu = osat[3] == "0" ? false : osat[3] == "1" ? true : (bool?)null;
                // "poikki vesi siirto <m>": vedenpinta alas/ylös vianetsintään (näkyykö maa veden alla), 0 = datan taso.
                if (arvo == "siirto" && osat.Length > 3) nayttamo?.Ymparisto?.SiirraVesi((float)Luku(osat[3]));
                o.Kirjaa($"poikki: vesi: ympäristö {nayttamo?.Ymparisto?.Tila ?? "-"}, heijastus {(DioraamaYmparisto.HeijastusPakotettu.HasValue ? (DioraamaYmparisto.HeijastusPakotettu.Value ? "päällä" : "pois") : "auto")}");
                return;
            }
            // "poikki kaistat [0|1|auto]": isojen ASTC-tekstuurien kaistoittainen GPU-lataus (linnan piikit 2.10.) vertailuun.
            if (mita == "kaistat")
            {
                DioraamaAstc.KaistatPakotettu = arvo == "0" ? false : arvo == "1" ? true : (bool?)null;
                o.Kirjaa($"poikki: kaistat {(DioraamaAstc.KaistatPakotettu == false ? "pois" : "päällä")} (seuraava lataus)");
                return;
            }
            // "poikki detalji [0|1|auto]": kuoren lähidetalji päälle/pois vertailua varten (menetelmä B, 30.9.2026).
            if (mita == "detalji")
            {
                DioraamaUlkokuori.DetaljiPakotettu = arvo == "0" ? false : arvo == "1" ? true : (bool?)null;
                nayttamo?.Ulkokuori?.AsetaDetaljiParam();
                o.Kirjaa($"poikki: detalji {(DioraamaUlkokuori.DetaljiPakotettu.HasValue ? (DioraamaUlkokuori.DetaljiPakotettu.Value ? "päällä" : "pois") : "auto")}, " +
                         $"data {(rakennus?.Ulkokuori?.Detalji != null ? "on" : "ei")}, {DioraamaLaatu.Kuvaus}");
                return;
            }
            // "poikki kuori [auto|huippu|normaali|kevyt]": ulkokuoren laatutaso (kehittäjän valitsin, muistetaan).
            if (mita == "kuori")
            {
                var uk = nayttamo?.Ulkokuori;
                if (arvo != null)
                {
                    // Setteri laukaisee PakotusVaihtui → LataaUlkokuori (konstruktori).
                    DioraamaUlkokuori.Pakotettu = arvo == "huippu" ? DioraamaUlkokuori.Laatu.Huippu : arvo == "normaali" ? DioraamaUlkokuori.Laatu.Normaali
                        : arvo == "kevyt" ? DioraamaUlkokuori.Laatu.Kevyt : (DioraamaUlkokuori.Laatu?)null;
                }
                o.Kirjaa("poikki: " + (uk != null ? uk.Kuvaus() : "kuori ei käytössä (näyttämö puuttuu)"));
                return;
            }
            if (mita == "lataa")
            {
                rakennus = null; latausKaynnissa = false;
                NollaaNakymanLataukset();
                rakennus3D?.Tyhjenna(); hahmot3D?.Tyhjenna(); nayttamo?.Hahmot3D?.Tyhjenna(); nayttamo?.Liekit?.Tyhjenna();
                nayttamo?.Savu?.Tyhjenna(); nayttamo?.Ikkunat?.Tyhjenna(); nayttamo?.Ulkokuori?.Tyhjenna(); nayttamo?.Ymparisto?.Tyhjenna(); nayttamo?.Lokit?.Tyhjenna(); // Olavinlinna: ei tuplia
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
            if (mita == "drift")
            {
                // Leijunta (era 2b, kohta 5) on linssi-instanssin ominaisuus. Toisin kuin Hehku (nayttamo-
                // instanssin ominaisuus, nayttamo tuhotaan/luodaan uudelleen joka Sulje/Avaa) linssi-kenttä on
                // readonly ja säilyy koko Sovittimen elinajan -- kytkin jää päälle Sulje/Avaa-kierron yli (vain
                // uusi peli-/Sovitin-instanssi nollaa sen oletukseen, pois).
                linssi.Leijunta = arvo == "1";
                o.Kirjaa("poikki: drift " + (arvo == "1" ? "päällä" : "pois"));
                return;
            }
            if (mita == "hahmot")
            {
                // 3D-malli vs. 2D-kortti (era 2b kohta 4, ali-agentti P4b): DioraamaHahmot3D.Paalla on
                // staattinen, oletus 3d (tosi) -- vaikuttaa seuraaviin LisaaTila-kutsuihin (SuodataHahmot3dPois
                // + DioraamaHahmot3D.LisaaTila), "poikki lataa" lataa tilat uudelleen. Sama sopimus kuin liekit.
                if (arvo == "3d" || arvo == "2d") DioraamaHahmot3D.Paalla = arvo == "3d";
                o.Kirjaa("poikki: hahmot " + (DioraamaHahmot3D.Paalla ? "3d" : "2d"));
                return;
            }
            if (mita == "liekit")
            {
                // 3D-liekki vs. atlas-billboard (era 2b kohta 6): DioraamaLiekit.Kolmiulotteinen on staattinen,
                // oletus 3d -- vaikuttaa seuraaviin LisaaTila-kutsuihin ("poikki lataa" lataa tilat uudelleen).
                if (arvo == "3d" || arvo == "atlas") DioraamaLiekit.Kolmiulotteinen = arvo == "3d";
                o.Kirjaa("poikki: liekit " + (DioraamaLiekit.Kolmiulotteinen ? "3d" : "atlas"));
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
            if (mita == "valo")
            {
                // Aurinko/Lamput/Tuli (era 2b, DioraamaValot.cs): nayttamo.Valot-olion kytkimet, kuten Hehku.
                // Nelisanainen komento: osat[2] = aurinko|lamput|tuli, osat[3] = 0|1 (kuten "taso"-komento).
                string kohde = arvo;
                bool paalla = (osat.Length > 3 ? osat[3] : null) == "1";
                if (nayttamo?.Valot == null) { o.Kirjaa("poikki: valot eivät ole valmiit (linssiä ei ole avattu kertaakaan)"); return; }
                if (kohde == "aurinko") nayttamo.Valot.Aurinko = paalla;
                else if (kohde == "lamput") nayttamo.Valot.Lamput = paalla;
                else if (kohde == "tuli") nayttamo.Valot.Tuli = paalla;
                else { o.Kirjaa("poikki: tuntematon valo " + kohde + " (aurinko|lamput|tuli)"); return; }
                o.Kirjaa("poikki: valo " + kohde + " " + (paalla ? "päällä" : "pois"));
                return;
            }
            if (mita == "valaistus")
            {
                // DioraamaValaistu/DioraamaMaalattu-vaihto (era 2b, DioraamaRakennus.Valaistus-ominaisuus): kuten
                // Hehku nayttamolle -- jos linssi on kiinni, kytkin ei säily seuraavaan avaukseen.
                if (rakennus3D != null) rakennus3D.Valaistus = arvo == "1";
                o.Kirjaa("poikki: valaistus " + (arvo == "1" ? "päällä (DioraamaValaistu)" : "pois (DioraamaMaalattu)"));
                return;
            }
            if (mita == "pinnat")
            {
                // A/B-vertailu (kohta 2: "Taulussa A/B-kytkin vain kehittäjätilassa"): kertaluonteinen pakotus
                // kaikille jo luoduille materiaaleille (ei pysyvä tila), ks. DioraamaRakennus.PakotaTilaKaikille.
                if (arvo != "a" && arvo != "b") { o.Kirjaa("poikki: pinnat a|b"); return; }
                rakennus3D?.PakotaTilaKaikille(arvo == "b");
                o.Kirjaa("poikki: pinnat " + arvo);
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
            else if (mita == "aika") pysaytettyT = (arvo == null || arvo == "pois") ? (double?)null : arvo == "nyt" ? t : Luku(arvo); // "nyt" jäädyttää nykyhetkeen (kuvaparit)
            else if (mita == "taso" && arvo != null && osat.Length > 3) { pakotettuTila = arvo; pakotettuTaso = (int)Luku(osat[3]); }
            else if (mita == "napauta") linssi.Napauta(t);
            // "poikki kertoja": esittely (kertojan kierros) alusta kuten valikon "Esittely uudelleen" (savukkeiden todennus 2.10.).
            else if (mita == "kertoja") { Yleisnakymaan(t); linssi.KertojaUudelleen(t + 0.1); }
            else if (mita == "mittaus") { o.Kirjaa(Mittausraportti()); return; }
            else if (mita != "tila") { o.Kirjaa("poikki: tuntematon " + mita); return; }
            o.Kirjaa(Tilaraportti());
        }

        /// <summary>Kehittäjän kiinteä kamera ("poikki kamera"), null = linssin oma.</summary>
        Matkakirja.Linssit.Dioraama.Asento? pakotettuKamera;

        static double Luku(string s) => double.Parse(s.Replace(',', '.'), CultureInfo.InvariantCulture);

        /// <summary>Puolikas pintatekstuuri, jos laite on pieni (era 2b, tekstuurimuisti 29.9.2026, omistaja:
        /// natiivissa 89 Mt Codexin pinnoilla, liikaa iPhonelle): fyysinen pikselimäärä (Screen.width×
        /// Screen.height -- EI riipu suunnasta/kierrosta, kertolasku on symmetrinen) alle 4 000 000 TAI
        /// SystemInfo.systemMemorySize (Mt) alle 6000. Kumpi tahansa riittää: pieninäyttöinen laite voi olla
        /// muistiltaan iso (silti täysi näyttö turhaa), ja iso näyttö voi olla muistiltaan pieni (silti
        /// vanhempi/halvempi laite). "poikki mittaus" (Mittausraportti) näyttää kumman tämän laite valitsi.</summary>
        // Omistaja 30.9.2026: täyden laadun laitteilla (DioraamaLaatu.Taysi, A17 Proa uudemmat) aina täydet tekstuurit ja 4k-atlakset.
        static bool PieniLaite() => !DioraamaLaatu.Taysi && ((long)Screen.width * Screen.height < 4_000_000L || SystemInfo.systemMemorySize < 6000);

        string Tilaraportti()
        {
            if (!avoinna) return "poikki: kiinni";
            if (rakennus == null) return "poikki: lataa" + (latausKaynnissa ? "…" : "");
            string kohde = viimeNakyma?.KohdeTila ?? "yleisnäkymä";
            return $"poikki: {rakennus.Nimi}, kohde {kohde}, tiloja {rakennus3D.TilojaLadattu}/{rakennus.Tilat.Count}, " +
                   $"hahmoja {hahmot3D.Maara}+{nayttamo.Hahmot3D?.Maara ?? 0} 3d ({nayttamo.Hahmot3D?.MallejaLadattu ?? 0} mallia), " +
                   $"peili {peiliKuvaus}, aika {(pysaytettyT.HasValue ? pysaytettyT.Value.ToString("F1", CultureInfo.InvariantCulture) : "elää")}, " + DioraamaLevyvalimuisti.Raportti();
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
            foreach (var t in ladatutValoAtlakset.Values) uusienTavuja += TekstuuriTavuja(t);
            double tekstuuriMt = ((hahmot3D?.TekstuuriTavuja() ?? 0) + uusienTavuja) / (1024.0 * 1024.0);
            // era 2b (kohta 4, ali-agentti P4b): 3D-hahmojen kolmiot lasketaan JAETUSTA geometriasta (kerran
            // per henkilö, ei per instanssi -- ks. DioraamaHahmot3D.KolmiotJaetussaGeometriassa-kommentti).
            int hahmo3dKolmiot = nayttamo?.Hahmot3D?.KolmiotJaetussaGeometriassa() ?? 0;
            // Era 2b (tekstuurimuisti): kertoo kumman pintakoon PieniLaite valitsi ja MIKSI (näyttöpikselit,
            // muisti) -- omistajan pyyntö "kertoo kumpi ja muistin".
            long naytonPikselit = (long)Screen.width * Screen.height;
            string pintakoko = (PieniLaite() ? "puolikas" : "täysi") + ", " + DioraamaLaatu.Kuvaus;
            return $"poikki mittaus: tiloja {rakennus3D?.TilojaLadattu ?? 0}/{rakennus?.Tilat?.Count ?? 0}, kolmioita {(rakennus3D?.Kolmiot ?? 0) + hahmo3dKolmiot} (3d-hahmot {hahmo3dKolmiot}), " +
                   $"kärkiä {rakennus3D?.Karjet ?? 0}, rendereitä {(rakennus3D?.Renderereita ?? 0) + (hahmot3D?.Maara ?? 0)}, " +
                   $"materiaaleja {(rakennus3D?.Materiaaleja ?? 0) + (hahmot3D?.AtlaksiaLadattu ?? 0)}, tekstuurimuisti (arvio) {tekstuuriMt:F1} Mt, " +
                   $"pinnat {pintakoko} (näyttö {naytonPikselit} px, laitemuisti {SystemInfo.systemMemorySize} Mt), kamera {asento}";
        }

        /// <summary>GPU-tekstuurimuisti (Profiler antaa todellisen koon mipmapit/pakkaus mukaan lukien; era 2 kohta 3
        /// mainitsee tämän tai käsinlasketun w·h·4·1,33-arvion -- Profiler on tarkempi kun se on saatavilla).</summary>
        static long TekstuuriTavuja(Texture2D t) => t != null ? Profiler.GetRuntimeMemorySizeLong(t) : 0;
    }
}
