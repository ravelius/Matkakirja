// LINSSIOHJAIN: linssien Unity-kytkentä (Linssiseppä 23.9.2026).
//
// KÄYNNISTYY ITSE (RuntimeInitializeOnLoadMethod, kuten PeliOhjain): etsii
// PalloKierron, luo olion "LinssiOhjain", rekisteröi linssit ja kutsuu
// rekisterin Paivita-metodia joka kehys. Rakennus.cs:ään ei tarvita muutoksia.
//
// Tämä tiedosto on Assembly-CSharpissa (ei asmdefiä), jotta Natiivi-UI näkee
// ohjaimen suoraan. Linssien logiikka on puhtaassa ytimessä (Linssit/Ydin,
// asmdef Matkakirja.Linssit.Ydin); tässä on vain sovitin sen ja kartan välillä:
//   - kerrokset → KarttaKerrokset.Instanssi (Natiiviseppä, RAJAPINTA.md luku 4)
//   - kamera    → PalloKierto (RAJAPINTA.md luku 1)
//   - peite, musiikki ja vähennetty liike → koukut, jotka UI ja äänet asettavat
//
// TESTIKOMENNOT ilman UI:ta: Documents/linssi-komento.txt, rivi kerrallaan
// "linssi <id>" (vaihtokytkin), "linssi pois", "linssit" (luettelo lokiin);
// maatilan linsseille "maa <ISO3>" (napautus), "vertaa" ja "lehti" (maakyltti);
// keksinnöille "keksinnot kaynnista | jatka | tauko | tila | <pysäkki 0–25>";
// ihmisen matkalle "esitys <jakso-id> | tauko | jatka | tila"; kaikille
// "kamera <lat> <lon> <korkeus km>" (hyppy kuvakaappausta varten) ja "tila".
// Tulos lokiin ja Documents/linssi-loki.txt:hen.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using CesiumForUnity;
using Matkakirja.Linssit;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public class LinssiOhjain : MonoBehaviour, ILinssiYmparisto
    {
        public static LinssiOhjain Instanssi { get; private set; }

        /// <summary>Linssirekisteri (Natiivi-UI:n valitsin lukee tätä).</summary>
        public static Linssirekisteri Rekisteri => Instanssi?.rekisteri;

        /// <summary>Tumma odotuspeite (Natiivi-UI asettaa). Ilman sitä peite on vain lokissa.</summary>
        public static Action<bool> PeiteKasittelija;
        /// <summary>Taustamusiikin pito (Pelikoodarin äänet asettavat).</summary>
        public static Action<bool> MusiikkiKasittelija;
        /// <summary>Vähennetty liike (iOS UIAccessibilityIsReduceMotionEnabled, liitännäinen).</summary>
        public static Func<bool> VahennettyLiikeKysely;

        PalloKierto kierto;
        Linssirekisteri rekisteri;
        KerrosSovitin kerrokset;
        string komentoPolku, lokiPolku;
        float komentoKello;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        public static void Kaynnista()
        {
            if (Instanssi != null) return;
            var kierto = FindAnyObjectByType<PalloKierto>();
            if (kierto == null)
            {
                Debug.LogWarning("MATKAKIRJA linssit: kohtauksessa ei ole PalloKiertoa, linssit eivät käynnisty");
                return;
            }
            var go = new GameObject("LinssiOhjain");
            go.AddComponent<LinssiOhjain>().Alusta(kierto);
        }

        void Alusta(PalloKierto k)
        {
            Instanssi = this;
            kierto = k;
            kerrokset = new KerrosSovitin();
            rekisteri = new Linssirekisteri(this);
            rekisteri.Lisaa(new Topografia());
            StartCoroutine(LataaAstronautti());
            StartCoroutine(LataaKeksinnot());
            StartCoroutine(LataaIhmisenMatka());
            StartCoroutine(LataaVesistot());
            StartCoroutine(LataaMaat());
            rekisteri.Vaihtui += l => Kirjaa("auki: " + (l?.Tiedot.Id ?? "ei mitään"));
            komentoPolku = Path.Combine(Application.persistentDataPath, "linssi-komento.txt");
            lokiPolku = Path.Combine(Application.persistentDataPath, "linssi-loki.txt");
        }

        /// <summary>Astronautin kamera rekisteriin, kun sen aineisto on ladattu paketista.</summary>
        System.Collections.IEnumerator LataaAstronautti()
        {
            string data = null, kysymykset = null;
            yield return LinssiSisalto.Hae("moduulit/js/linssit/satelliitti-data.json", t => data = t);
            yield return LinssiSisalto.Hae("moduulit/js/linssit/astronaut-kysymykset.json", t => kysymykset = t);
            if (data == null) { Kirjaa("astronautin kamera: aineisto puuttuu"); yield break; }
            try
            {
                var aineisto = Matkakirja.Linssit.Astronautti.AstronauttiAineisto.Lue(
                    Matkakirja.Peli.MiniJson.Jasenna(data), kysymykset == null ? null : Matkakirja.Peli.MiniJson.Jasenna(kysymykset));
                rekisteri.Lisaa(new AstronauttiSovitin(this, aineisto));
                Kirjaa($"astronautin kamera: {aineisto.Kohteet.Count} kohdetta");
            }
            catch (Exception e) { Kirjaa("astronautin kamera: " + e.Message); }
        }

        static Dictionary<string, object> Olio(object x) => x as Dictionary<string, object>;

        /// <summary>Hakee osoitteen tekstinä (manifestit ämpäristä); null, jos ei onnistu.</summary>
        static System.Collections.IEnumerator HaeOsoite(string osoite, Action<string> valmis)
        {
            using var p = UnityEngine.Networking.UnityWebRequest.Get(osoite);
            p.timeout = 20;
            yield return p.SendWebRequest();
            valmis(p.result == UnityEngine.Networking.UnityWebRequest.Result.Success ? p.downloadHandler.text : null);
        }

        /// <summary>
        /// Ihmisen matka: aineisto, kertomusmanifesti ja rantamaski paketista; virrat ja
        /// vanat lasketaan taustasäikeessä heti latauksen jälkeen, jotta ne ovat valmiit,
        /// kun pelaaja avaa linssin (webissä Käynnistä-nappi odottaa samoin).
        /// </summary>
        System.Collections.IEnumerator LataaIhmisenMatka()
        {
            string data = null, kertomus = null, linssi = null, aineisto = null, manifesti = null;
            yield return LinssiSisalto.Hae("moduulit/js/linssit/ihmisen-matka-data.json", t => data = t);
            yield return LinssiSisalto.Hae("moduulit/js/linssit/ihmisen-matka-kertomus.json", t => kertomus = t);
            yield return LinssiSisalto.Hae("moduulit/js/linssit/ihmisen-matka.json", t => linssi = t);
            yield return LinssiSisalto.Hae("kokoelmat/linssiaineisto.json", t => aineisto = t);
            if (data == null || kertomus == null || linssi == null) { Kirjaa("ihmisen matka: aineisto puuttuu"); yield break; }

            Matkakirja.Linssit.Aikajana.IhmisenMatkaAineisto a;
            Matkakirja.Linssit.Virrat.VirtaAineisto virrat;
            Matkakirja.Linssit.Virrat.Ruutumaski rantamaski = null;
            string manifestinOsoite = null, aanenJuuri = null;
            try
            {
                a = Matkakirja.Linssit.Aikajana.IhmisenMatkaAineisto.Lue(Matkakirja.Peli.MiniJson.Jasenna(data), Matkakirja.Peli.MiniJson.Jasenna(kertomus));
                var linssiOlio = Olio(Olio(Olio(Matkakirja.Peli.MiniJson.Jasenna(linssi))?["exportit"])?["LINSSI"]);
                virrat = Matkakirja.Linssit.Virrat.AineistonLukija.LueLinssista(linssiOlio);
                var alkiot = aineisto == null ? null : Olio(Matkakirja.Peli.MiniJson.Jasenna(aineisto))?["alkiot"] as List<object>;
                foreach (var o in alkiot ?? new List<object>())
                {
                    var alkio = Olio(o);
                    var id = alkio?["id"] as string;
                    if (id == "rantamaski") rantamaski = Matkakirja.Linssit.Virrat.Ruutumaski.Lue(alkio);
                    if (id == "kertomus" && Olio(alkio["data"]) is Dictionary<string, object> k)
                    {
                        manifestinOsoite = k.TryGetValue("manifesti", out var m) ? m as string : null;
                        aanenJuuri = k.TryGetValue("juuri", out var j) ? j as string : null;
                    }
                }
            }
            catch (Exception e) { Kirjaa("ihmisen matka: " + e.Message); yield break; }

            if (manifestinOsoite != null) yield return HaeOsoite(manifestinOsoite, t => manifesti = t);
            object manifestiOlio = manifesti == null ? null : Matkakirja.Peli.MiniJson.Jasenna(manifesti);
            var leimat = manifestiOlio == null
                ? new Dictionary<string, Matkakirja.Linssit.Aikajana.JaksonLeimat>()
                : Matkakirja.Linssit.Aikajana.IhmisenMatkaAineisto.LueManifesti(manifestiOlio);
            string aanite = manifestiOlio == null || aanenJuuri == null ? null
                : Matkakirja.Linssit.Aikajana.IhmisenMatkaAineisto.ManifestinAanite(manifestiOlio, aanenJuuri);

            var sovitin = new IhmisenMatkaSovitin(this, a, leimat, aanite, virrat, rantamaski);
            rekisteri.Lisaa(sovitin);
            Kirjaa($"ihmisen matka: {a.Kertomus.Count} jaksoa, {leimat.Count} aikaleimaa, ääni {(aanite ?? "ei")}");

            var laskenta = System.Threading.Tasks.Task.Run(() => Matkakirja.Linssit.Aikajana.IhmisenMatkaLinssi.Laske(virrat));
            while (!laskenta.IsCompleted) yield return null;
            if (laskenta.IsFaulted) { Kirjaa("ihmisen matka: virtojen laskenta: " + laskenta.Exception?.InnerException?.Message); yield break; }
            sovitin.VanatValmiit(laskenta.Result);
            Kirjaa($"ihmisen matka: {laskenta.Result.Vanat.Count} vanaa laskettu");
        }

        public sealed class IhmisenMatkaSovitin : ILinssi
        {
            readonly LinssiOhjain o;
            readonly Matkakirja.Linssit.Aikajana.IhmisenMatkaAineisto aineisto;
            readonly IReadOnlyDictionary<string, Matkakirja.Linssit.Aikajana.JaksonLeimat> leimat;
            readonly string aanite;
            readonly Matkakirja.Linssit.Virrat.VirtaAineisto virrat;
            readonly Matkakirja.Linssit.Virrat.Ruutumaski rantamaski;
            Matkakirja.Linssit.Virrat.VanatTulos vanat;
            Matkakirja.Linssit.Aikajana.IhmisenMatkaLinssi linssi;
            IhmisenMatkaKerros kerros;
            EsityksenAani aani;

            public IhmisenMatkaSovitin(LinssiOhjain o, Matkakirja.Linssit.Aikajana.IhmisenMatkaAineisto a,
                IReadOnlyDictionary<string, Matkakirja.Linssit.Aikajana.JaksonLeimat> leimat, string aanite,
                Matkakirja.Linssit.Virrat.VirtaAineisto virrat, Matkakirja.Linssit.Virrat.Ruutumaski rantamaski)
            { this.o = o; aineisto = a; this.leimat = leimat; this.aanite = aanite; this.virrat = virrat; this.rantamaski = rantamaski; }

            public LinssiTiedot Tiedot => Matkakirja.Linssit.Aikajana.IhmisenMatkaLinssi.IhmisenMatkaTiedot;
            public bool Auki => linssi?.Auki ?? false;
            /// <summary>Käynnissä oleva linssi (Natiivi-UI: Esitys.Tauko/Jatka/Valitse).</summary>
            public Matkakirja.Linssit.Aikajana.IhmisenMatkaLinssi Linssi => linssi;
            /// <summary>Kertojan ääni (linssi-loki), null ennen avausta.</summary>
            public EsityksenAani Aani => aani;

            public void VanatValmiit(Matkakirja.Linssit.Virrat.VanatTulos tulos)
            {
                vanat = tulos;
                if (linssi == null) return;
                // Rantamaski (linssiaineisto) puuttuu julkaistusta paketista v2: vanat
                // piirretään silloin ilman rannan leikkausta (VanaPiirto sietää nullin).
                kerros.AsetaVanat(tulos, virrat, rantamaski);
                linssi.AsetaVanat(tulos);
            }

            public void Avaa(ILinssiYmparisto y)
            {
                kerros = IhmisenMatkaKerros.Luo(o.kierto, aineisto.Paikat);
                aani = EsityksenAani.Luo(kerros.transform, aanite);
                linssi = new Matkakirja.Linssit.Aikajana.IhmisenMatkaLinssi(aineisto, leimat, kerros, aani);
                // Esittelylaatikko (Natiivi-UI) käynnistää esityksen Kaynnista-kutsulla.
                linssi.Itsestaan = !IhmisenMatkaKerros.EsittelyUIssa;
                linssi.Avaa(y);
                if (vanat != null) VanatValmiit(vanat);
            }

            public void Paivita() => linssi?.Paivita();

            public void Sulje()
            {
                linssi?.Sulje();
                linssi = null;
                if (kerros != null) Destroy(kerros.gameObject);
                kerros = null;
                aani = null;
            }
        }

        /// <summary>
        /// Vesistölinssi: maasto (järvet, joet), nimipaketti (luokat ja nimet) ja
        /// LINSSI-tiedot paketista. Pallon muunnos ja järvien kolmiointi lasketaan
        /// kerran tässä (muutama ms), joten linssin avaus on vain meshien rakennus.
        /// Ei avauskynnystä (Linssirekisteri.Avauskynnykset): vain kehittäjätilassa.
        /// </summary>
        System.Collections.IEnumerator LataaVesistot()
        {
            string maasto = null, nimet = null, linssi = null;
            yield return LinssiSisalto.Hae("moduulit/js/packs/maailmankartta-maasto.json", t => maasto = t);
            yield return LinssiSisalto.Hae("moduulit/js/packs/maailmankartta-nimet.json", t => nimet = t);
            yield return LinssiSisalto.Hae("moduulit/js/linssit/vesistot.json", t => linssi = t);
            if (maasto == null || linssi == null) { Kirjaa("vesistöt: aineisto puuttuu"); yield break; }
            try
            {
                var a = Matkakirja.Linssit.Vesistot.VesistotAineisto.Lue(Matkakirja.Peli.MiniJson.Jasenna(maasto),
                    nimet == null ? null : Matkakirja.Peli.MiniJson.Jasenna(nimet), Matkakirja.Peli.MiniJson.Jasenna(linssi));
                var pallolla = Matkakirja.Linssit.Vesistot.VesistotPallolle.Laske(a);
                rekisteri.Lisaa(new VesistotSovitin(this, a, pallolla));
                Kirjaa($"vesistöt: {pallolla.Jarvet.Count} järveä, {pallolla.Uomat.Count} uomaa, {pallolla.Nimet.Count} nimeä, muunnos {pallolla.KestoMs:F1} ms");
            }
            catch (Exception e) { Kirjaa("vesistöt: " + e.Message); }
        }

        /// <summary>Vesistölinssi Unityssä: 3D-kerros avatessa, purku sulkiessa (logiikka VesistotLinssissä).</summary>
        public sealed class VesistotSovitin : ILinssi
        {
            readonly LinssiOhjain o;
            readonly Matkakirja.Linssit.Vesistot.VesistotAineisto aineisto;
            readonly Matkakirja.Linssit.Vesistot.VesistotPallolla pallolla;
            Matkakirja.Linssit.Vesistot.VesistotLinssi linssi;
            VesistotKerros kerros;
            public VesistotSovitin(LinssiOhjain o, Matkakirja.Linssit.Vesistot.VesistotAineisto a, Matkakirja.Linssit.Vesistot.VesistotPallolla p)
            { this.o = o; aineisto = a; pallolla = p; }
            public LinssiTiedot Tiedot => aineisto.Tiedot;
            public bool Auki => linssi?.Auki ?? false;
            /// <summary>Auki oleva linssi (Natiivi-UI), muuten null.</summary>
            public Matkakirja.Linssit.Vesistot.VesistotLinssi Linssi => linssi;
            public void Avaa(ILinssiYmparisto y)
            {
                kerros = VesistotKerros.Luo(o.kierto);
                linssi = new Matkakirja.Linssit.Vesistot.VesistotLinssi(aineisto, kerros, pallolla);
                linssi.Avaa(y);
            }
            public void Paivita() => linssi?.Paivita();
            public void Sulje()
            {
                linssi?.Sulje();   // kutsuu kerroksen Pois-metodia, joka tuhoaa sen
                linssi = null;
                kerros = null;
            }
        }

        System.Collections.IEnumerator LataaKeksinnot()
        {
            string data = null, aineisto = null;
            yield return LinssiSisalto.Hae("moduulit/js/linssit/keksinnot.json", t => data = t);
            if (data == null) { Kirjaa("keksinnöt: aineisto puuttuu"); yield break; }
            KeksinnotSovitin sovitin;
            try
            {
                var a = Matkakirja.Linssit.Aikajana.KeksinnotAineisto.Lue(Matkakirja.Peli.MiniJson.Jasenna(data));
                sovitin = new KeksinnotSovitin(this, a);
                rekisteri.Lisaa(sovitin);
                Kirjaa($"keksinnöt: {a.Pysakit.Count} pysäkkiä");
            }
            catch (Exception e) { Kirjaa("keksinnöt: " + e.Message); yield break; }

            // Pysäkkiluennat linssiaineistosta (koepaketti v9+; julkaistussa v2:ssa ei ole).
            // Linssiaineistossa on isoja maskeja, joten jäsennys taustasäikeessä.
            yield return LinssiSisalto.Hae("kokoelmat/linssiaineisto.json", t => aineisto = t);
            if (aineisto == null) { Kirjaa("keksinnöt: luennat puuttuvat (ei linssiaineistoa)"); yield break; }
            var lataus = System.Threading.Tasks.Task.Run(() =>
                Matkakirja.Linssit.Aikajana.KeksintoLuennat.Lue(Matkakirja.Peli.MiniJson.Jasenna(aineisto)));
            while (!lataus.IsCompleted) yield return null;
            if (lataus.IsFaulted) { Kirjaa("keksinnöt: luennat: " + lataus.Exception?.InnerException?.Message); yield break; }
            sovitin.Luennat = lataus.Result;
            Kirjaa($"keksinnöt: {lataus.Result?.Maara ?? 0} pysäkkiluentaa");
        }

        /// <summary>
        /// Vertailu ja maiden tiedot: maarajat ja maat kokoelmista, linssitiedot moduuleista.
        /// Jäsennys (maarajat ~1 Mt) taustasäikeessä. Maatila on Natiivisepän
        /// KarttaKerrokset.Maat (MaaKartta), joka haetaan vasta avatessa.
        /// </summary>
        System.Collections.IEnumerator LataaMaat()
        {
            string rajat = null, maat = null, vertailu = null, maatiedot = null;
            yield return LinssiSisalto.Hae("kokoelmat/maarajat.json", t => rajat = t);
            yield return LinssiSisalto.Hae("kokoelmat/maat.json", t => maat = t);
            yield return LinssiSisalto.Hae("moduulit/js/linssit/vertailu.json", t => vertailu = t);
            yield return LinssiSisalto.Hae("moduulit/js/linssit/maatiedot.json", t => maatiedot = t);
            if (rajat == null) { Kirjaa("maat: maarajat puuttuu"); yield break; }
            object J(string t) => t == null ? null : Matkakirja.Peli.MiniJson.Jasenna(t);
            var lataus = System.Threading.Tasks.Task.Run(() =>
                Matkakirja.Linssit.Maat.MaatAineisto.Lue(J(rajat), J(maat), J(vertailu), J(maatiedot)));
            while (!lataus.IsCompleted) yield return null;
            if (lataus.IsFaulted) { Kirjaa("maat: " + lataus.Exception?.InnerException?.Message); yield break; }
            var a = lataus.Result;
            rekisteri.Lisaa(new MaatSovitin(this, a, vertailu: true));
            rekisteri.Lisaa(new MaatSovitin(this, a, vertailu: false));
            Kirjaa($"maat: {a.Maat.Count} maata, {a.Maat.Values.Count(m => m.NimiPallolle)} nimeä");
        }

        /// <summary>
        /// Vertailu- tai maatietolinssi Unityssä. Linssi-olio säilyy (vertailun valinnat
        /// säilyvät sulkemisen yli kuten webissä); maanimikerros luodaan avatessa.
        /// Natiivi-UI kuuntelee Linssi-olion tapahtumia (VertailuLinssi.Muuttui,
        /// Tayttui, VertailuPyydetty; MaatiedotLinssi.ValittuMuuttui, LehtiPyydetty).
        /// </summary>
        public sealed class MaatSovitin : ILinssi
        {
            readonly LinssiOhjain o;
            readonly Matkakirja.Linssit.Maat.MaatAineisto aineisto;
            readonly bool onVertailu;
            Matkakirja.Linssit.Maat.MaatilaLinssi linssi;
            Matkakirja.Linssit.Maat.IMaaKartta kartta;
            MaidenNimetKerros nimet;

            public MaatSovitin(LinssiOhjain o, Matkakirja.Linssit.Maat.MaatAineisto a, bool vertailu)
            { this.o = o; aineisto = a; onVertailu = vertailu; }
            public LinssiTiedot Tiedot => onVertailu ? aineisto.Vertailu : aineisto.Maatiedot;
            public bool Auki => linssi?.Auki ?? false;
            /// <summary>Linssi-olio (luodaan ensimmäisellä avauksella; null ennen sitä).</summary>
            public Matkakirja.Linssit.Maat.MaatilaLinssi Linssi => linssi;

            public void Avaa(ILinssiYmparisto y)
            {
                var k = KarttaKerrokset.Instanssi?.Maat;
                if (k == null) o.Kirjaa("maat: maatila puuttuu (KarttaKerrokset.Maat)");
                if (linssi == null || k != kartta)
                {
                    kartta = k;
                    linssi = onVertailu
                        ? new Matkakirja.Linssit.Maat.VertailuLinssi(aineisto, k, new NimetValitys(this))
                        : new Matkakirja.Linssit.Maat.MaatiedotLinssi(aineisto, k);
                    Kirjaaja(linssi);
                }
                linssi.Avaa(y);
            }
            public void Paivita() => linssi?.Paivita();
            public void Sulje() => linssi?.Sulje();

            void Kirjaaja(Matkakirja.Linssit.Maat.MaatilaLinssi l)
            {
                if (l is Matkakirja.Linssit.Maat.VertailuLinssi v)
                {
                    v.Muuttui += () => { if (v.Auki) o.Kirjaa("vertailu: " + string.Join(", ", v.Valinnat)); };
                    v.Tayttui += () => o.Kirjaa("vertailu: " + Matkakirja.Linssit.Maat.VertailuLinssi.TaynnaOtsikko);
                    v.VertailuPyydetty += m => o.Kirjaa("vertailu pyydetty: " + string.Join(", ", m.Select(x => x.Nimi)));
                }
                if (l is Matkakirja.Linssit.Maat.MaatiedotLinssi t)
                {
                    t.ValittuMuuttui += m => o.Kirjaa("maatiedot: " + (m?.Nimi ?? "ei valintaa"));
                    t.LehtiPyydetty += m => o.Kirjaa($"maatiedot lehti: {m.Nimi} ({m.Maalehti ?? "ei lehteä"})");
                }
            }

            /// <summary>Maanimikerros elää vain linssin avauksen ajan.</summary>
            sealed class NimetValitys : Matkakirja.Linssit.Maat.IMaidenNimet
            {
                readonly MaatSovitin s;
                public NimetValitys(MaatSovitin s) { this.s = s; }
                public void Nimet(IReadOnlyList<Matkakirja.Linssit.Maat.Maa> maat)
                {
                    if (s.nimet == null) s.nimet = MaidenNimetKerros.Luo(s.o.kierto);
                    s.nimet.Nimet(maat);
                }
                public void Pois()
                {
                    s.nimet?.Pois();
                    s.nimet = null;
                }
            }
        }

        public sealed class KeksinnotSovitin : ILinssi
        {
            readonly LinssiOhjain o;
            readonly Matkakirja.Linssit.Aikajana.KeksinnotAineisto aineisto;
            Matkakirja.Linssit.Aikajana.KeksinnotLinssi linssi;
            KeksinnotKerros kerros;
            public KeksinnotSovitin(LinssiOhjain o, Matkakirja.Linssit.Aikajana.KeksinnotAineisto a) { this.o = o; aineisto = a; }
            /// <summary>Pysäkkiluennat (ladataan linssin rekisteröinnin jälkeen; null = hiljainen ajo).</summary>
            public Matkakirja.Linssit.Aikajana.KeksintoLuennat Luennat;
            public LinssiTiedot Tiedot => aineisto.Tiedot;
            public bool Auki => linssi?.Auki ?? false;
            /// <summary>Käynnissä oleva linssi (Natiivi-UI: Kaynnista, JatkaValinaytoksesta, Ajo.Tauko, Ajo.Siirry).</summary>
            public Matkakirja.Linssit.Aikajana.KeksinnotLinssi Linssi => linssi;
            public void Avaa(ILinssiYmparisto y)
            {
                kerros = KeksinnotKerros.Luo(o.kierto, aineisto);
                // Soitin on kerroksen lapsi: kerroksen tuho sulkee luennan.
                var soitin = Luennat == null ? null : LuentaSoitin.Luo(kerros.transform);
                linssi = new Matkakirja.Linssit.Aikajana.KeksinnotLinssi(aineisto, kerros, luennat: Luennat, soitin: soitin);
                linssi.Avaa(y);
                if (!KeksinnotKerros.EsittelyUIssa) linssi.Kaynnista();
            }
            public void Paivita() => linssi?.Paivita();
            public void Sulje()
            {
                linssi?.Sulje();
                linssi = null;
                if (kerros != null) Destroy(kerros.gameObject);
                kerros = null;
            }
        }

        /// <summary>
        /// Astronautin kamera Unityssä: luo 3D-kerroksen avatessa ja purkaa sen
        /// sulkiessa; logiikka on puhtaassa AstronauttiLinssissä.
        /// </summary>
        public sealed class AstronauttiSovitin : ILinssi
        {
            readonly LinssiOhjain o;
            readonly Matkakirja.Linssit.Astronautti.AstronauttiAineisto aineisto;
            Matkakirja.Linssit.Astronautti.AstronauttiLinssi linssi;
            AstronauttiKerros kerros;
            public AstronauttiSovitin(LinssiOhjain o, Matkakirja.Linssit.Astronautti.AstronauttiAineisto a) { this.o = o; aineisto = a; }
            public LinssiTiedot Tiedot => Matkakirja.Linssit.Astronautti.AstronauttiLinssi.AstronauttiTiedot;
            public bool Auki => linssi?.Auki ?? false;
            /// <summary>Auki oleva linssi (Natiivi-UI), muuten null.</summary>
            public Matkakirja.Linssit.Astronautti.AstronauttiLinssi Linssi => linssi;
            /// <summary>Auki olevan linssin 3D-kerros (Natiivi-UI: kohteiden napautus), muuten null.</summary>
            public AstronauttiKerros Kerros => kerros;
            public void Avaa(ILinssiYmparisto y)
            {
                kerros = AstronauttiKerros.Luo(o.kierto);
                linssi = new Matkakirja.Linssit.Astronautti.AstronauttiLinssi(aineisto, kerros);
                kerros.Linssi = linssi;
                linssi.Avaa(y);
            }
            public void Paivita() => linssi?.Paivita();
            public void Sulje() { linssi?.Sulje(); linssi = null; kerros = null; }
        }

        void Update()
        {
            kerrokset.Kytke();
            rekisteri.Paivita();
            komentoKello -= Time.unscaledDeltaTime;
            if (komentoKello <= 0f) { komentoKello = 0.5f; LueKomennot(); }
        }

        void OnDestroy()
        {
            rekisteri?.Sulje();
            kerrokset?.Irrota();
            if (Instanssi == this) Instanssi = null;
        }

        // ── ILinssiYmparisto ──────────────────────────────────────────────

        public IKarttaKerrokset Kerrokset => kerrokset;

        public Nakyma Kamera => new Nakyma(kierto.leveys, kierto.pituus, kierto.korkeus, kierto.kallistus);

        public void AjaKamera(Nakyma kohde, float kestoS, Func<double, double> pehmennys = null) =>
            kierto.Aja(kohde.Lat, kohde.Lon, kohde.Korkeus, Mathf.Max(0.01f, kestoS), null, pehmennys);

        /// <summary>
        /// Pelin oma loitonnuksen katto on jo koko pallo (PalloKierto.MaxKorkeus),
        /// joten topografian pyyntö ei muuta mitään. Tiukempi katto tarvitaan
        /// vasta, jos jokin linssi rajaa loitonnusta; silloin PalloKierto saa asettimen.
        /// </summary>
        public void ZoomiKatto(double? maxKorkeus) { }

        public double KokoPallonKorkeus => kierto.MaxKorkeus();

        /// <summary>
        /// PalloKierto.KorkeusKaarelle mittaa kapeamman suunnan kaaren. Pystyruudulla
        /// se on leveys; vaakaruudulla leveyden kaari muunnetaan korkeuden kaareksi
        /// kuvasuhteella (pienillä kulmilla tarkka, koko pallolla katto rajaa).
        /// </summary>
        public double KorkeusLeveydelle(double leveysAsteina)
        {
            double suhde = Kuvasuhde;
            double kapea = suhde > 1 ? leveysAsteina / suhde : leveysAsteina;
            return kierto.KorkeusKaarelle(kapea);
        }

        public double Kuvasuhde
        {
            get
            {
                var kamera = kierto.GetComponent<Camera>();
                return kamera != null && kamera.aspect > 0 ? kamera.aspect : (double)Screen.width / Mathf.Max(1, Screen.height);
            }
        }

        public void Pelikerrokset(bool nakyvissa)
        {
            var k = KarttaKerrokset.Instanssi;
            if (k == null) return;
            k.Nakyvyys("kaupungit", nakyvissa);
            k.Nakyvyys("nimiot", nakyvissa);
            // Kaupungin nimikortti pois linssin tieltä (web body.aikajana-paalla .fact-card;
            // iPad-kuvassa Pariisin kortti jäi ihmisen matkan päälle). Kortti palaa
            // seuraavasta kaupungin napautuksesta, joten palautusta ei tarvita.
            if (!nakyvissa) FindAnyObjectByType<NimiKortti>()?.Piilota();
        }

        public void Peite(bool paalla)
        {
            Kirjaa("peite " + (paalla ? "päälle" : "pois"));
            PeiteKasittelija?.Invoke(paalla);
        }

        public void MusiikkiPitoon(bool pidossa) => MusiikkiKasittelija?.Invoke(pidossa);

        public bool VahennettyLiike => VahennettyLiikeKysely?.Invoke() ?? false;

        public double Aika => Time.realtimeSinceStartupAsDouble;

        // ── Testikomennot ─────────────────────────────────────────────────

        void LueKomennot()
        {
            if (!File.Exists(komentoPolku)) return;
            string[] rivit;
            try { rivit = File.ReadAllLines(komentoPolku); File.Delete(komentoPolku); }
            catch (IOException e) { Debug.LogWarning("MATKAKIRJA linssi-komento: " + e.Message); return; }
            foreach (var rivi in rivit.Select(r => r.Trim()).Where(r => r.Length > 0)) Suorita(rivi);
        }

        void Suorita(string rivi)
        {
            var osat = rivi.Split(' ');
            try
            {
                if (osat[0] == "linssit")
                    Kirjaa(string.Join(", ", rekisteri.Kaikki.Select(l => l.Tiedot.Id)));
                else if (osat[0] == "linssi" && osat.Length > 1 && osat[1] == "pois")
                    rekisteri.Sulje();
                else if (osat[0] == "linssi" && osat.Length > 1)
                    rekisteri.Valitse(osat[1]);
                else if (osat[0] == "keksinnot" && osat.Length > 1)
                    Keksinnot(osat[1]);
                else if (osat[0] == "esitys" && osat.Length > 1)
                    Esitys(osat[1]);
                else if (osat[0] == "kamera" && osat.Length > 3)
                    AjaKamera(new Nakyma(Luku(osat[1]), Luku(osat[2]), Luku(osat[3]) * 1000), 0f);
                else if (osat[0] == "tila")
                    Kirjaa($"tila: auki {rekisteri.Auki?.Tiedot.Id ?? "ei"}, kamera {Kamera}");
                else if (osat[0] == "maa" && osat.Length > 1)
                    (rekisteri.Auki as MaatSovitin)?.Linssi?.Napauta(osat[1].ToUpperInvariant());
                else if (osat[0] == "vertaa")
                    Kirjaa("vertaa: " + ((rekisteri.Auki as MaatSovitin)?.Linssi is Matkakirja.Linssit.Maat.VertailuLinssi v && v.Vertaa()));
                else if (osat[0] == "lehti")
                    Kirjaa("lehti: " + ((rekisteri.Auki as MaatSovitin)?.Linssi is Matkakirja.Linssit.Maat.MaatiedotLinssi m && m.AvaaLehti()));
                else
                    Kirjaa("tuntematon komento: " + rivi);
            }
            catch (ArgumentException e) { Kirjaa("virhe: " + e.Message); }
        }

        static double Luku(string s) =>
            double.Parse(s.Replace(',', '.'), System.Globalization.CultureInfo.InvariantCulture);

        void Keksinnot(string mita)
        {
            var l = (rekisteri.Auki as KeksinnotSovitin)?.Linssi;
            if (l?.Ajo == null) { Kirjaa("keksinnöt: linssi ei ole auki"); return; }
            if (mita == "kaynnista") l.Kaynnista();
            else if (mita == "jatka") l.JatkaValinaytoksesta();
            else if (mita == "tauko") l.Ajo.Tauko();
            else if (int.TryParse(mita, out int i)) l.Ajo.Siirry(i);
            else if (mita != "tila") { Kirjaa("keksinnöt: tuntematon " + mita); return; }
            var t = l.Ajo.Tila;
            Kirjaa($"keksinnöt: pysäkki {t.I}, vuosi {t.Paikka:F1}, käynnissä {l.Ajo.Kaynnissa}, välinäytös {l.Ajo.ValinaytosAuki}, luenta {System.IO.Path.GetFileName(l.Luenta ?? "-")}");
        }

        void Esitys(string mita)
        {
            var e = (rekisteri.Auki as IhmisenMatkaSovitin)?.Linssi?.Esitys;
            if (e == null) { Kirjaa("esitys: ihmisen matka ei ole auki tai ei käynnissä"); return; }
            if (mita == "tauko") e.Tauko();
            else if (mita == "jatka") e.Jatka();
            else if (mita != "tila") e.Valitse(mita);
            var aani = (rekisteri.Auki as IhmisenMatkaSovitin)?.Aani;
            Kirjaa($"esitys: jakso {e.I}, kulunut {e.Kulunut / 1000:F1}/{e.Kesto / 1000:F1} s, vuosia {e.Vuosia:F0}, käynnissä {e.Kaynnissa}, ääni {aani?.Tila ?? "ei"}");
        }

        void Kirjaa(string teksti)
        {
            Debug.Log("MATKAKIRJA linssit: " + teksti);
            try { File.AppendAllText(lokiPolku, $"{Aika:F2} {teksti}\n"); } catch (IOException) { }
        }

        // ── Kerrokset ─────────────────────────────────────────────────────

        /// <summary>
        /// IKarttaKerrokset KarttaKerrokset-komponentin päälle. Kerroksen tila
        /// seurataan KerrosValmis- ja KerrosEpaonnistui-tapahtumista.
        /// KarttaKerrokset.Instanssi on null ennen kohtauksen latausta, joten
        /// tapahtumat kytketään ensimmäisellä kehyksellä, kun se on olemassa.
        /// </summary>
        sealed class KerrosSovitin : IKarttaKerrokset
        {
            readonly Dictionary<string, KerrosTila> tilat = new Dictionary<string, KerrosTila>();
            KarttaKerrokset kytketty;

            public void Kytke()
            {
                var k = KarttaKerrokset.Instanssi;
                if (k == kytketty) return;
                Irrota();
                kytketty = k;
                if (k == null) return;
                k.KerrosValmis += Valmis;
                k.KerrosEpaonnistui += Epaonnistui;
            }

            public void Irrota()
            {
                if (kytketty == null) return;
                kytketty.KerrosValmis -= Valmis;
                kytketty.KerrosEpaonnistui -= Epaonnistui;
                kytketty = null;
            }

            void Valmis(string avain) { if (tilat.ContainsKey(avain)) tilat[avain] = KerrosTila.Valmis; }
            void Epaonnistui(string avain) { if (tilat.ContainsKey(avain)) tilat[avain] = KerrosTila.Luovutti; }

            public void LisaaRasteri(string avain, Rasteri r)
            {
                Kytke();
                if (kytketty == null) { tilat[avain] = KerrosTila.Luovutti; return; }
                tilat[avain] = KerrosTila.Latautuu;
                kytketty.LisaaRasteri(avain, r.CesiumUrl,
                    r.Projektio == Projektio.Geographic
                        ? CesiumUrlTemplateRasterOverlayProjection.Geographic
                        : CesiumUrlTemplateRasterOverlayProjection.WebMercator,
                    r.MinTaso, r.MaxTaso, r.Alfa);
            }

            public void Poista(string avain)
            {
                tilat.Remove(avain);
                kytketty?.PoistaRasteri(avain);
            }

            public void Nakyvyys(string avain, bool nakyvissa) => KarttaKerrokset.Instanssi?.Nakyvyys(avain, nakyvissa);

            public KerrosTila Tila(string avain) =>
                tilat.TryGetValue(avain, out var t) ? t : KerrosTila.Luovutti;
        }
    }
}
