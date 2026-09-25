// IHMISEN MATKA II: TEHOSTEKERROS (omistaja 25.9.2026, Raamattu "IHMISEN MATKA II"; suunnitelma
// docs/raportit/ihmisen-matka-2-suunnitelma-20260925.md, Fable hyväksyi 25.9.).
//
// Sama esitys (Esitys.cs) kuin I:ssä; IhmisenMatkaKerros välittää sen kutsut (Musta, Valot, Jakso, SytytaKohde,
// Kuva, Loppu) myös tälle komponentille, joka kertoo tarinan valolla. Ydin ei muutu.
//
// ERÄ 1 (omistajan kolme vaatimusta; tekstityksen logiikka on IhmisenMatkaKerroksessa):
//   KUVA ISOMMAKSI JA KARTTA VÄISTÄÄ: havainnekuvan alue lasketaan ruudun muodosta (puhelin pystyssä: yläpuolisko
//   koko leveydeltä; vaaka: oikea puolisko; iPad pystyssä: yläosa 80 %:n levyisenä). Kartan katsekohde siirtyy
//   projektion pääpisteen siirrolla (KarttaKerrokset.Linssisiirto, Natiiviseppä) kuvan alta vapaalle alueelle, joten
//   kamera, kallistus ja eleet eivät muutu. UI (Natiivi-UI) sijoittaa kuvan IhmisenMatkaKerros.KuvanAlue-alueeseen.
//   VANAT EIVÄT NÄY KUVAN ALTA: VanaKerros häivyttää kaistan kuvan alueelta (Vana.shader _KuvanAlue), sisään ja ulos
//   kuvan tahdissa (KuvanHaivytysS).
//
// ERÄ 2 (KOHDENNETTU VALO, Raamattu 23.9. "aurinko/kohdevalo vain siihen osaan karttaa, missä tarina on käynnissä,
//   muu pallo hämärämpi"): Natiivisepän KarttaKerrokset.Valokeila (tileset-varjostin: vain pohja ja laatat hämärtyvät,
//   vanat, lamput ja UI pysyvät kirkkaina). Valot-vaiheessa keila syttyy Afrikan ylle; jakson kohteeseen keila liukuu
//   isoympyrää pitkin kameran ajon tahdissa (Esitys.ViimeisinAjo), edellinen kohde jää heikoksi toiseksi keilaksi
//   (lähtö ja määränpää), alueen jaksoissa keila kattaa rajauksen. Seudun sävy: luolissa soihtu (1900 K), kylmissä
//   jaksoissa sininen päivänvalo, merellä kuunvalo, muuten lyhty (3200 K). Kuvan aikana hämärä syvenee (kuva nousee
//   valosta), aikahypyssä valo sammuu hetkeksi, lopussa keilat sammuvat ja koko pallo syttyy.
//
// ERÄ 4 (AIDOT ÄÄNIMAISEMAT): IhmisenMatka2Maisema soittaa jakson `maisema`-tyypin ämpäristä (aanihaku, Freesound
//   CC0/CC BY) ristihäivytyksellä; kertojan puheen alla väistö. Loppu häivyttää.
//
// ERÄ 5 (VAPAAT KÄDET, omistaja: "saat lisätä niin paljon visuaalisia tehosteita kuin vain keksit"):
//   AAMUNKOITTO: valot syttyvät ensin pienenä kirkkaana pisteenä (tarina alkaa yhdestä paikasta) ja avautuvat mantereen
//   yli. RINTAMAN HEHKU: vanojen etenevä kärki loistaa ja sykkii (VanaKerros.hehku, Vana.shader _Hehku).
//   LÄHIKUVAN LASKEUTUMINEN (Fable 25.9.: kallistettu lento maaston yllä): Kuva(kohde) antaa kohteen paikan kameran
//   kääreelle (IhmisenMatka2Ymparisto), joka laskeutuu jakson ajon jälkeen kohteen ylle kallistettuna.
//   LOPPUKUVA: loppujaksossa keilat sammuvat, koko pallo syttyy ja kaikki vanat hehkuvat omalla värillään
//   (VanaKerros.loppuhehku, _Hehku.w); tutkimusvaiheeseen siirryttäessä hehku laskee.
//   SOIHDUN LEPATUS: luolajaksojen (Denisova, Chauvet) soihtukeila värisee levossa kuin liekki (Lepata).
//
// ERÄ 3 (KERROKSELLINEN SUMU; Natiiviseppä 25.9.: omana kerroksena Linssit-puolelle): IhmisenMatka2Sumu — avauksen
//   kolme kuorta, joiden läpi kamera syöksyy, ja jakson seudun matala sumu valokeilan valossa (Pilvikuoret).
//
// LÖYDÖS 151 (omistaja build 16: "kameraliikkeet liian äkkinäisiä kartan väistäessä"): väistö oli oma 0,9 s:n liukunsa
//   jakson 1,4–9 s:n kamera-ajon päällä, joten kuva nytkähti sivuun ennen kuin kamera ehti liikkua. Nyt väistö odottaa jakson
//   ajoa (Esitys ajaa heti Kuva-kutsun jälkeen samassa kutsussa, saattolento seuraavassa kehyksessä) ja kulkee kääreen
//   kirjaaman ajon (IhmisenMatka2Ymparisto.Ajo) käyrällä samassa tahdissa: väistö ja ajo ovat yksi liike (Raamattu KAMERA-AJOT:
//   yksi yhtenäinen käyrä, ei erillisiä liikkeitä päällekkäin). Ilman omaa ajoa (Marokon ajo jo matkalla, jakso ilman aluetta)
//   väistö liukuu pehmeästi käynnissä olevan ajon loppuun tai 1,6 s (paluu 1,8 s); logiikka Ytimessä (KuvanVaisto).
//   PalloKierto.Linssisiirto liukuu vain smootherstepillä, joten ajon käyrää (kuminauha, syöksy, Marokon kaari) ajetaan
//   tässä kehys kerrallaan: LateUpdatessa lyhyt liuku seuraavan kehyksen arvoon, jonka PalloKierto vie perille samassa
//   päivityksessä kuin kameran ajon, ja liuku pitää PalloKierto.Liikkeessa-tilan päällä (täysi ruudunpäivitys).
using System.Collections.Generic;
using Matkakirja.Linssit.Aikajana;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public class IhmisenMatka2Tehosteet : MonoBehaviour
    {
        /// <summary>Ruudun kierron jälkeen väistö uuteen kohtaan (s). Muut väistön kestot: KuvanVaisto (Ydin), löydös 151.</summary>
        public const float KiertoS = 0.6f;
        /// <summary>Kehyksen askel PalloKierto.Linssisiirrolle (s): seuraava päivitys vie arvon perille.</summary>
        const float VaistonAskelS = 0.001f;
        /// <summary>Vanojen häivytys kuvan alueelta (s).</summary>
        public const float KuvanHaivytysS = 0.4f;
        /// <summary>Kuvan reunavara ruudun reunaan (pt).</summary>
        public const float ReunaPt = 12f;
        /// <summary>Linssin yläpalkin varaus turva-alueen alla (pt): nimi, Tauko, ☰ ja vuosiluku (LINSSIEN YLÄPALKKI iPHONELLA).</summary>
        public const float YlapalkkiPt = 96f;
        /// <summary>Aikaselaimen varaus alareunassa (pt).</summary>
        public const float AlapalkkiPt = 104f;
        /// <summary>Havainnekuvien kuvasuhde (ämpärin kuvat 1536 × 1024).</summary>
        public const float Kuvasuhde = 1.5f;

        /// <summary>Hämärä kertomuksen aikana (0 = ei, 1 = lähes musta) ja kuvan aikana.</summary>
        public const float HamaraPerus = 0.55f, HamaraKuva = 0.72f;
        /// <summary>Valojen syttyminen: keila Afrikan ylle (säde km).</summary>
        public const float AfrikanSadeKm = 3800f;
        /// <summary>Kohdekeilan säde rajauksen leveydestä (osuus) ja rajat (km).</summary>
        public const float KohteenOsuus = 0.2f, KohdeMinKm = 380f, KohdeMaxKm = 1500f;
        /// <summary>Aluekeilan säde rajauksen leveydestä (osuus) ja rajat (km).</summary>
        public const float AlueenOsuus = 0.42f, AlueMinKm = 900f, AlueMaxKm = 4800f;
        /// <summary>Toisen keilan (edellinen kohde) voimakkuus ja vähimmäisetäisyys (km).</summary>
        public const float ToisenVoima = 0.45f, ToisenMinKm = 600f;
        /// <summary>Lopun sammutus (s): keilat pois, koko pallo syttyy.</summary>
        public const float LopunSammutusS = 3.2f;
        /// <summary>Loppukuvan vanahehkun nousu ja lasku (s): loppujaksossa koko vana hehkuu, tutkimusvaiheessa ei.</summary>
        public const float LoppuhehkuS = 2.5f;
        float loppuhehku, loppuTavoite;
        /// <summary>
        /// SOIHDUN LEPATUS (erä 5, luolat): levossa oleva soihtukeila värisee kuin liekki — voimakkuus ja keskustan hehku
        /// kahden kohinataajuuden summana, päivitys LepatusHz (keilan siirtymä kestää saman ajan, joten muutos on pehmeä).
        /// Vain levossa, ettei liuku pysäkiltä toiselle katkea, eikä vähennetyllä liikkeellä.
        /// </summary>
        public const float LepatusHz = 15f, LepatusSyvyys = 0.25f;
        float lepoAlkaa = -1f, seuraavaLepatus;

        /// <summary>Seudun valo jakson tunnuksesta (Raamattu IHMISEN MATKA II, vapaat kädet): luolat, kylmä, meri.</summary>
        static readonly HashSet<string> Luolat = new HashSet<string> { "denisova", "chauvet" };
        static readonly HashSet<string> Kylmat = new HashSet<string> { "napapiiri", "beringia", "white-sands", "eurooppa" };
        static readonly HashSet<string> Meret = new HashSet<string> { "meri", "uusi-seelanti" };

        IhmisenMatkaKerros kerros;
        Dictionary<string, (double Lat, double Lon)> paikat;
        KertomusJakso jakso;
        bool keilaOdottaa, keilaPaalla, kuvaPaalla;
        KarttaKerrokset.Keila nykyinen;
        KarttaKerrokset.Keila? toinen;
        (double Lat, double Lon)? edellinenKohde;
        IhmisenMatka2Maisema maisema;
        IhmisenMatka2Sumu sumu;
        /// <summary>Kerroksellinen sumu (komento "sumu tila"); null, jos georeferenssiä ei ole.</summary>
        public IhmisenMatka2Sumu Sumu => sumu;
        IhmisenMatka2Hiukkaset hiukkaset;
        /// <summary>Lumi ja valopöly (komento "hiukkaset tila"); null, jos varjostinta tai kameraa ei ole.</summary>
        public IhmisenMatka2Hiukkaset Hiukkaset => hiukkaset;
        string kuvaKohde;
        float kuvanPeitto;
        int ruutuW, ruutuH;

        /// <summary>Kuvan väistö samalla käyrällä kuin jakson kamera-ajo (löydös 151, logiikka Ytimessä).</summary>
        readonly KuvanVaisto vaisto = new KuvanVaisto();
        /// <summary>Viimeksi asetettu Linssisiirto (ruudun osuuksina).</summary>
        Vector2 siirtoNyt;

        /// <summary>Kuvan alue ruudun osuuksina (origo vasen yläkulma); null, kun kuvaa ei ole.</summary>
        public Rect? KuvanAlue { get; private set; }

        public void Kytke(IhmisenMatkaKerros k, PalloKierto kierto, Dictionary<string, (double Lat, double Lon)> paikkaIndeksi)
        {
            kerros = k;
            paikat = paikkaIndeksi;
            maisema = IhmisenMatka2Maisema.Luo(transform);
            maisema.KertojaSoi = () => (LinssiOhjain.Rekisteri?.Auki as LinssiOhjain.IhmisenMatkaSovitin)?.Aani?.KohtaMs != null;
            sumu = IhmisenMatka2Sumu.Luo(transform, kierto);
            hiukkaset = IhmisenMatka2Hiukkaset.Luo(transform, kierto);
            LinssiOhjain.Instanssi?.Kirjaa("ihmisen matka II: tehosteet kytketty");
        }

        public void Musta(bool paalla, double feidiMs)
        {
            if (!paalla) return;
            // Pimeä alku: ei keilaa (tähdet ja musta ruutu kertovat avauksen).
            KarttaKerrokset.ValokeilaPois(0f);
            keilaPaalla = false;
            edellinenKohde = null;
            // Uusi esitys (myös Aloita alusta): edellisen kuvan väistö pois heti mustan alla, ei liukuna.
            VaistoPoisHeti();
            KuvanAlue = null;
            kuvaKohde = null;
            kuvaPaalla = false;
        }

        public void Valot(double feidiMs)
        {
            // AAMUNKOITTO: ensin pieni kuuma piste (2600 K), sitten lyhty avautuu mantereen kokoiseksi ja muu maailma jää
            // hämärään. Vähennetyllä liikkeellä suoraan loppukuvaan.
            float kesto = Kesto((float)(feidiMs / 1000.0));
            nykyinen = new KarttaKerrokset.Keila(2, 20, AfrikanSadeKm, 0.6f, null, 0.1f);
            toinen = null;
            if (kesto <= 0f) { Nayta(0f); return; }
            StopCoroutine(nameof(Aamunkoitto));
            StartCoroutine(nameof(Aamunkoitto), kesto);
        }

        System.Collections.IEnumerator Aamunkoitto(float kesto)
        {
            var piste = new KarttaKerrokset.Keila(2, 20, 420f, 0.85f, KarttaKerrokset.KelvinVari(2600f, 0.9f), 0.3f);
            KarttaKerrokset.Valokeila(piste, null, 0.82f, kesto * 0.25f);
            keilaPaalla = true;
            yield return new WaitForSecondsRealtime(kesto * 0.3f);
            if (!keilaOdottaa) Nayta(kesto * 0.9f);
        }

        public void Jakso(int i, KertomusJakso j)
        {
            jakso = j;
            if (j == null) return;
            // Saattolento (Amerikat): kääre ajaa kameraa rintaman edellä; tämän kutsun on tultava ennen Esityksen ajoa.
            if (Kaare() is { } kaare)
            {
                kaare.Rintama ??= RintamaNyt;
                kaare.Jakso(j.Id);
            }
            maisema?.Aseta(j.Maisema);
            sumu?.Jakso(j);
            hiukkaset?.Jakso(j);
            loppuTavoite = j.Vaihe == "loppu" ? 1f : 0f;
            if (j.Vaihe == "loppu") { Sammuta(Kesto(LopunSammutusS)); return; }
            if (j.Vaihe == "pimea") return;
            if (j.Vaihe == "hyppy")
            {
                // Aikahyppy: valo sammuu hetkeksi (kello kelautuu), keila syttyy uuteen paikkaan kameran perässä.
                KarttaKerrokset.ValokeilaPois(Kesto(0.6f));
                keilaPaalla = false;
                edellinenKohde = null;
            }
            // Esitys ajaa kameran samassa kutsussa Jakson jälkeen: keila asetetaan seuraavassa kehyksessä rajauksesta.
            keilaOdottaa = true;
        }

        /// <summary>Esityksen viimeisin kamerarajaus (keskus, leveys asteina, kesto ms) tai null.</summary>
        static ((double Lat, double Lon) keskus, double leveysAst, double kestoMs)? Rajaus()
        {
            var e = (LinssiOhjain.Rekisteri?.Auki as LinssiOhjain.IhmisenMatkaSovitin)?.Linssi?.Esitys;
            if (e?.ViimeisinAjo is not { } a) return null;
            return ((a.keskus.Lat, a.keskus.Lon), a.leveysAst, a.kestoMs);
        }

        /// <summary>Jakson keila rajauksesta: kohde (ja edellinen kohde toiseksi) tai alue.</summary>
        void AsetaJaksonKeila()
        {
            keilaOdottaa = false;
            var j = jakso;
            var r = Rajaus();
            if (j == null || r == null) return;
            double km = r.Value.leveysAst * 111.2;
            float kesto = Kesto(Mathf.Clamp((float)(r.Value.kestoMs / 1000.0), 1.2f, 4.5f));
            var (vari, kirkkaus) = Seudun(j.Id);
            (double Lat, double Lon)? kohde = j.Kohde != null && paikat != null && paikat.TryGetValue(j.Kohde, out var p) ? p : null;
            if (kohde is { } k)
            {
                float sade = Mathf.Clamp((float)(km * KohteenOsuus), KohdeMinKm, KohdeMaxKm);
                if (Luolat.Contains(j.Id)) sade *= 0.6f;   // soihtu: kapea valo
                nykyinen = new KarttaKerrokset.Keila(k.Lat, k.Lon, sade, 0.55f, vari, kirkkaus);
                // Lähtö heikkona toisena keilana, jos se on kaukana (ylitykset: Levantti, Sahul, Beringia …).
                toinen = edellinenKohde is { } e && Valokeilalaskenta_Km(e, k) > ToisenMinKm
                    ? new KarttaKerrokset.Keila(e.Lat, e.Lon, sade * 0.75f, 0.6f, vari, 0f, ToisenVoima)
                    : (KarttaKerrokset.Keila?)null;
                edellinenKohde = k;
            }
            else
            {
                float sade = Mathf.Clamp((float)(km * AlueenOsuus), AlueMinKm, AlueMaxKm);
                nykyinen = new KarttaKerrokset.Keila(r.Value.keskus.Lat, r.Value.keskus.Lon, sade, 0.6f, vari, kirkkaus * 0.6f);
                toinen = null;
            }
            Nayta(kesto);
        }

        static double Valokeilalaskenta_Km((double Lat, double Lon) a, (double Lat, double Lon) b)
        {
            double la1 = a.Lat * Mathf.Deg2Rad, la2 = b.Lat * Mathf.Deg2Rad, dl = (b.Lon - a.Lon) * Mathf.Deg2Rad;
            double c = System.Math.Sin(la1) * System.Math.Sin(la2) + System.Math.Cos(la1) * System.Math.Cos(la2) * System.Math.Cos(dl);
            return System.Math.Acos(System.Math.Max(-1.0, System.Math.Min(1.0, c))) * 6371.0;
        }

        /// <summary>Seudun valon sävy ja keskustan hehku jakson tunnuksesta (null = lyhty).</summary>
        static (Color? vari, float kirkkaus) Seudun(string id)
        {
            if (id != null && Luolat.Contains(id)) return (KarttaKerrokset.KelvinVari(1900f, 0.8f), 0.22f);
            if (id != null && Kylmat.Contains(id)) return (KarttaKerrokset.KelvinVari(9500f, 0.6f), 0.08f);
            if (id != null && Meret.Contains(id)) return (KarttaKerrokset.KelvinVari(12000f, 0.55f), 0.06f);
            return (null, 0.12f);
        }

        void Nayta(float kesto)
        {
            KarttaKerrokset.Valokeila(nykyinen, toinen, kuvaPaalla ? HamaraKuva : HamaraPerus, kesto);
            keilaPaalla = true;
            lepoAlkaa = Time.unscaledTime + kesto;
        }

        static IhmisenMatka2Ymparisto Kaare() => (LinssiOhjain.Rekisteri?.Auki as LinssiOhjain.IhmisenMatkaSovitin)?.Kaare;

        /// <summary>Vanojen selkärangan kärki kellon mukaan (saattolento); null ennen vanoja.</summary>
        (double Lat, double Lon)? RintamaNyt()
        {
            var e = (LinssiOhjain.Rekisteri?.Auki as LinssiOhjain.IhmisenMatkaSovitin)?.Linssi?.Esitys;
            var v = kerros != null ? kerros.Vanat : null;
            if (e == null || v == null) return null;
            return v.Karki(e.Vuosia) is { } k ? (k.Lat, k.Lon) : ((double Lat, double Lon)?)null;
        }

        /// <summary>
        /// SAATTOLENNON KEILA (suunnitelma: "keila seuraa rintamaa etelään"): pääkeila kulkee rintaman mukana ja määränpää
        /// palaa heikkona toisena keilana. Saattolennon päätyttyä jakson oma keila palaa (Nayta).
        /// </summary>
        public const float SaattoKeilaKm = 800f, SaattoKeilaAskelS = 0.5f;
        float seuraavaSaattoKeila;
        bool saattoKeila;

        void SaataKeila()
        {
            bool saattaa = Kaare()?.Saattaa ?? false;
            if (!saattaa)
            {
                // Saattolento korvasi lähtökeilan: perillä vain kohteen keila.
                if (saattoKeila) { saattoKeila = false; toinen = null; if (keilaPaalla) Nayta(Kesto(1.2f)); }
                return;
            }
            float nyt = Time.unscaledTime;
            if (nyt < seuraavaSaattoKeila || RintamaNyt() is not { } r) return;
            seuraavaSaattoKeila = nyt + SaattoKeilaAskelS;
            var paa = new KarttaKerrokset.Keila(r.Lat, r.Lon, SaattoKeilaKm, 0.55f, null, 0.14f);
            var maaranpaa = nykyinen;
            maaranpaa.voimakkuus = ToisenVoima;
            maaranpaa.kirkkaus = 0f;
            KarttaKerrokset.Valokeila(paa, maaranpaa, kuvaPaalla ? HamaraKuva : HamaraPerus,
                Kesto(saattoKeila ? SaattoKeilaAskelS * 1.1f : 1.2f));
            saattoKeila = true;
            keilaPaalla = true;
            lepoAlkaa = -1f;   // ei lepatusta saattolennon aikana
        }

        /// <summary>Soihdun lepatus levossa olevaan luolakeilaan (ks. LepatusHz).</summary>
        void Lepata()
        {
            float nyt = Time.unscaledTime;
            if (!keilaPaalla || keilaOdottaa || jakso == null || !Luolat.Contains(jakso.Id) || lepoAlkaa < 0f
                || nyt < lepoAlkaa || nyt < seuraavaLepatus || Kesto(1f) <= 0f) return;
            seuraavaLepatus = nyt + 1f / LepatusHz;
            float n = Mathf.PerlinNoise(nyt * 7.3f, 0.37f) * 0.65f + Mathf.PerlinNoise(nyt * 19.1f, 3.1f) * 0.35f;
            var k = nykyinen;
            k.voimakkuus = nykyinen.voimakkuus * (1f - LepatusSyvyys * n);
            k.kirkkaus = Mathf.Min(0.3f, nykyinen.kirkkaus * (1.15f - 0.5f * n));
            KarttaKerrokset.Valokeila(k, toinen, kuvaPaalla ? HamaraKuva : HamaraPerus, 1f / LepatusHz);
        }

        void Sammuta(float kesto)
        {
            KarttaKerrokset.ValokeilaPois(kesto);
            keilaPaalla = false;
            keilaOdottaa = false;
        }

        public void SytytaKohde(string kohde) { }

        /// <summary>Esitys näyttää löytöpaikan kuvan (tai null = kuva pois): kuvan alue ja kartan väistö.</summary>
        public void Kuva(string kohde)
        {
            // Lähikuvan laskeutuminen: Esitys ajaa kohteen jaksoon heti tämän jälkeen, kääre laskeutuu ajon päätyttyä.
            (LinssiOhjain.Rekisteri?.Auki as LinssiOhjain.IhmisenMatkaSovitin)?.Kaare?.Lahikuva(
                kohde != null && paikat != null && paikat.TryGetValue(kohde, out var kp) ? kp : ((double Lat, double Lon)?)null);
            kuvaKohde = kohde;
            bool oli = kuvaPaalla;
            kuvaPaalla = kohde != null;
            // Kuva nousee valosta: hämärä syvenee kuvan ajaksi (sama keila).
            if (keilaPaalla && oli != kuvaPaalla && !keilaOdottaa) Nayta(Kesto(0.8f));
            if (kohde == null)
            {
                KuvanAlue = null;
                PyydaVaisto(Vector2.zero, paluu: true);
                return;
            }
            if (Asettele() is { } kohdalle) PyydaVaisto(kohdalle, paluu: false);
        }

        public void Loppu()
        {
            maisema?.Lopeta();
            sumu?.Loppu();
            hiukkaset?.Loppu();
            loppuTavoite = 0f;   // tutkimusvaihe: vanat takaisin tavallisiksi
            Sammuta(Kesto(LopunSammutusS));
            KuvanAlue = null;
            // Esityksen loppu ajaa kameran koko palloon ennen tätä kutsua: paluu kulkee sen käyrällä.
            PyydaVaisto(Vector2.zero, paluu: true);
        }

        static float Kesto(float s) => LinssiOhjain.Instanssi != null && LinssiOhjain.Instanssi.VahennettyLiike ? 0f : s;

        // ── Kuvan väistö (löydös 151) ──

        static double Kello() => Kaare()?.Kello ?? Time.realtimeSinceStartupAsDouble;

        /// <summary>Väistö uuteen kohtaan: odottaa jakson ajoa (KuvanVaisto.Ratkaise LateUpdatessa). Vähennetty liike: heti.</summary>
        void PyydaVaisto(Vector2 kohde, bool paluu)
        {
            if (Kesto(1f) <= 0f)
            {
                // Vähennetty liike: ajot ovat hyppyjä, joten väistökin.
                vaisto.Heti((kohde.x, kohde.y));
                Aseta(kohde);
                return;
            }
            vaisto.Pyyda((kohde.x, kohde.y), paluu, Kello(), Kaare()?.Ajo);
        }

        /// <summary>
        /// Väistö kehys kerrallaan (LateUpdate): odottava väistö liittyy jakson ajoon, ja arvo lasketaan seuraavan kehyksen
        /// hetkelle, jolloin PalloKierto vie sen perille samassa päivityksessä kuin kameran ajon.
        /// </summary>
        void AjaVaisto()
        {
            double kello = Kello();
            if (vaisto.Ratkaise(kello, Kaare()?.Ajo))
                LinssiOhjain.Instanssi?.Kirjaa("ihmisen matka II: kuvan väistö " + vaisto.Kuvaus(kello));
            if (!vaisto.Liikkuu) return;
            var (x, y) = vaisto.Arvo(kello + Time.unscaledDeltaTime);
            Aseta(new Vector2((float)x, (float)y));
            if (!vaisto.Liikkuu) LinssiOhjain.Instanssi?.Kirjaa($"ihmisen matka II: kuvan väistö perillä {x:0.00},{y:0.00}");
        }

        /// <summary>Linssisiirto tähän arvoon seuraavassa PalloKierron päivityksessä (lyhyt liuku: kuva liikkuu, täysi ruudunpäivitys).</summary>
        void Aseta(Vector2 arvo)
        {
            if ((arvo - siirtoNyt).sqrMagnitude < 1e-12f) return;
            siirtoNyt = arvo;
            KarttaKerrokset.Linssisiirto(Mathf.Clamp(arvo.x, -0.5f, 0.5f), Mathf.Clamp(arvo.y, -0.5f, 0.5f), VaistonAskelS);
        }

        /// <summary>Väistö pois heti (musta ruutu, linssi suljetaan).</summary>
        void VaistoPoisHeti()
        {
            vaisto.Heti((0, 0));
            if (siirtoNyt == Vector2.zero) return;
            siirtoNyt = Vector2.zero;
            KarttaKerrokset.LinssisiirtoPois(0f);
        }

        /// <summary>
        /// Kuvan alue ja kartan väistö ruudun muodosta. Pisteet muunnetaan pikseleiksi LinssiOhjain.Pistekerroin-kertoimella
        /// (sama kuin UI:n pt). Katsekohde siirretään kuvan ulkopuolisen vapaan alueen keskelle; palauttaa väistön kohteen.
        /// </summary>
        Vector2? Asettele()
        {
            float W = Screen.width, H = Screen.height;
            if (W < 1 || H < 1) return null;
            ruutuW = Screen.width; ruutuH = Screen.height;
            float pt = Mathf.Max(1f, LinssiOhjain.Pistekerroin);
            Rect turva = Screen.safeArea;                        // origo vasen alakulma
            float ylaTurva = H - turva.yMax, alaTurva = turva.yMin;
            float vasenTurva = turva.xMin, oikeaTurva = W - turva.xMax;
            float reuna = ReunaPt * pt;
            float yla = ylaTurva + YlapalkkiPt * pt;           // kuvan yläraja (ylhäältä)
            float ala = H - alaTurva - AlapalkkiPt * pt;       // vapaan alueen alaraja (ylhäältä)

            float x, y, w, h, dx = 0f, dy = 0f;
            if (W >= H)
            {
                // VAAKA: kuva oikealle puolelle, kohde vasemman vapaan alueen keskelle.
                w = Mathf.Min(0.52f * W, (ala - yla) * Kuvasuhde);
                h = w / Kuvasuhde;
                x = W - oikeaTurva - reuna - w;
                y = yla + Mathf.Max(0f, ((ala - yla) - h) * 0.5f);
                float xk = (vasenTurva + reuna + (x - reuna)) * 0.5f;
                dx = xk / W - 0.5f;
            }
            else
            {
                // PYSTY: puhelimella koko leveys (92 %), iPadilla 80 %; kohde kuvan alapuolisen vapaan alueen keskelle.
                bool puhelin = W / H < 0.62f;
                w = Mathf.Min((puhelin ? 1f : 0.8f) * (W - vasenTurva - oikeaTurva) - 2f * reuna, (ala - yla) * 0.55f * Kuvasuhde);
                h = w / Kuvasuhde;
                x = (W - w) * 0.5f;
                y = yla;
                float yk = (y + h + ala) * 0.5f;
                dy = -(yk / H - 0.5f);
            }
            KuvanAlue = new Rect(x / W, y / H, w / W, h / H);
            LinssiOhjain.Instanssi?.Kirjaa($"ihmisen matka II: kuva {kuvaKohde} alue {KuvanAlue.Value.x:0.00},{KuvanAlue.Value.y:0.00} " +
                $"{KuvanAlue.Value.width:0.00}×{KuvanAlue.Value.height:0.00}, väistö {dx:0.00},{dy:0.00}");
            return new Vector2(Mathf.Clamp(dx, -0.5f, 0.5f), Mathf.Clamp(dy, -0.5f, 0.5f));
        }

        void LateUpdate()
        {
            // Kaikkien Updatejen jälkeen: Esityksen tämän kehyksen ajo on jo kääreen kirjanpidossa, ja PalloKierto vie väistön
            // arvon perille seuraavassa päivityksessään (PallonLepo 9990 näkee liukuvan siirron samassa kehyksessä).
            AjaVaisto();
        }

        void Update()
        {
            if (keilaOdottaa) AsetaJaksonKeila();
            SaataKeila();
            Lepata();
            // Ruudun kierto kesken kuvan: alue ja väistö uudelleen (ilman ajoa, lyhyt pehmeä liuku).
            if (kuvaKohde != null && (Screen.width != ruutuW || Screen.height != ruutuH) && Asettele() is { } uusi)
            {
                if (Kesto(1f) <= 0f) { vaisto.Heti((uusi.x, uusi.y)); Aseta(uusi); }
                else vaisto.Liuku((uusi.x, uusi.y), Kello(), KiertoS);   // odottava väistö saa uuden kohteen samaan ajoon
            }
            float tavoite = KuvanAlue.HasValue ? 1f : 0f;
            float kesto = Kesto(KuvanHaivytysS);
            kuvanPeitto = kesto <= 0f ? tavoite : Mathf.MoveTowards(kuvanPeitto, tavoite, Time.unscaledDeltaTime / kesto);
            float hehkuS = Kesto(LoppuhehkuS);
            loppuhehku = hehkuS <= 0f ? loppuTavoite : Mathf.MoveTowards(loppuhehku, loppuTavoite, Time.unscaledDeltaTime / hehkuS);
            var v = kerros != null ? kerros.Vanat : null;
            if (v != null)
            {
                if (KuvanAlue.HasValue) v.kuvanAlue = KuvanAlue.Value;
                v.kuvanPeitto = kuvanPeitto;
                v.hehku = 1f;
                v.loppuhehku = loppuhehku;
            }
        }

        void OnDestroy()
        {
            // Linssi suljettiin: kartan pääpiste heti paikalleen (kamera palaa omalla ajollaan).
            if (siirtoNyt != Vector2.zero || vaisto.Liikkuu) KarttaKerrokset.LinssisiirtoPois(0f);
            siirtoNyt = Vector2.zero;
            vaisto.Heti((0, 0));
            KuvanAlue = null;
            // Keila ja hämärä pois heti: muu peli ei saa jäädä hämärään.
            KarttaKerrokset.ValokeilaPois(0f);
        }
    }
}
