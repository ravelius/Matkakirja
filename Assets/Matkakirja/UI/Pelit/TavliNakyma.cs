// TAVLI-NÄKYMÄ (Siirtoseppä 5.10.2026; suunnitelma docs/raportit/tavli-suunnitelma-20261005.md, Päätoimittaja hyväksyi 5.10. 01.1x).
// Myllyn lautapelipohja sellaisenaan (MyllyNakyma.cs, LAUTAPELI-pohja lautapeli.uss): samat USS-luokat ja Tyylikirjan arvot, ei uusia
// tyylejä eikä värivakioita.
//   PELI    = JULISTE-otsikko (viiva / TAVLI / laudan nimi / viiva) + lauta 4:3 (Linnanrakentajan Kafeneio-kerrokset, mitat
//             tavli-mitat.json) + 3D-nopat (TavliNopat) + PANEELI (PAPERI: kapiteeli, vuororivi, pelaajarivit pip / pois / palkilla,
//             ohje = oppimisen kärki eli osuma- ja sisääntulotodennäköisyydet, napit Säännöt / Luovuta / Poistu).
//   VALINTA = KORTTI (vastustaja Helppo / Normaali / Vaikea + Kaveri, lauta; Peruuta / Aloita peli), TULOS = KORTTI (kuten Mylly).
// Vuoro: napautus laudalle heittää (tulos Satunnainen-lähteestä ensin, nopat vierivät sen jälkeen) → napauta omaa nappulaa tai
// palkkia (palkilta sisään valitaan itse) → lailliset kohteet Myllyn renkailla → napauta kohdetta (Tavli.EtsiAskel) tai poisto-
// lokeroa. Kun laillisia askeleita ei ole, vuoro päättyy itsestään. Botti (TavliBotti, Task.Run) pelaa askel kerrallaan animoiden.
// Kumoa-nappia pohjassa ei ole (suunnitelma: ei uutta nappia) → vain testikomento "kumoa".
// Testikomento: ui tavli [valinta | kohtaaminen [kaupunki] | peli helppo|normaali|vaikea|kaveri | lauta <n> | heitto <a> <b> |
//   napauta <0–23|palkki|pois|lauta> | asema <p0,…,p23|palkki0,palkki1|vuoro> | kumoa | tulos <0|1|-2> | tila | sulje].
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Matkakirja.Peli;
using Matkakirja.Peli.Pelit;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class TavliNakyma
    {
        static TavliNakyma instanssi;
        public static TavliNakyma Hae() => instanssi ??= new TavliNakyma(UiKerros.Hae());

        /// <summary>Kohtaaminen Ateenassa (Peliluettelo.Kytke → PeliOhjain.AvaaLautapeli → UiNakymat).</summary>
        public static void Kohtaaminen(PeliKuvaus peli, PeliMaa maa, string kaupunki)
        {
            var n = Hae();
            n.Maa = maa?.MaanNimi; n.PaikallinenNimi = maa?.PaikallinenNimi; n.Paikka = kaupunki;
            n.Avaa();
        }

        /// <summary>Uusintapeli Pelit-välilehdeltä: "tavli" tai "tavli:&lt;lauta&gt;".</summary>
        public static void AvaaPeli(string id)
        {
            var osat = (id ?? "").Split(':');
            if (osat[0] != Peliluettelo.Tavli.Id) return;
            var n = Hae();
            n.Maa = null; n.PaikallinenNimi = null; n.Paikka = null;
            int lautaIx = osat.Length > 1 ? Array.FindIndex(Laudat, l => l.Id == osat[1]) : -1;
            if (lautaIx >= 0 && LautaKaytossa(lautaIx)) n.Lauta = lautaIx;
            n.Avaa();
        }

        public static void SuljeJosAuki() => instanssi?.Sulje();
        public static bool AukiNyt => instanssi != null && instanssi.Auki;

        public string Paikka = null, PaikallinenNimi = null, Maa = null;

        readonly VisualElement juuri, peliTaso, paneeli, korttiTaso, pysaytys;
        const int PysaytysKerros = UiKerros.Nostot - 1;
        readonly TavliLauta lauta;
        readonly Label kapiteeli, vuoroRivi, nimi0, nimi1, lukema0, lukema1, ohje;
        readonly Kortti valintaKortti, tulosKortti;
        readonly List<Button> tasoNapit = new List<Button>(), lautaNapit = new List<Button>();
        readonly Label lautaHistoria;
        static PeliLauta[] Laudat => Peliluettelo.Tavli.Laudat;
        static Pelaaja Pelaaja => PeliOhjain.Instanssi != null && PeliOhjain.Instanssi.Matka != null ? PeliOhjain.Instanssi.Matka.Tila.Pelaaja : null;
        static bool LautaKaytossa(int i) => Asetukset.Kehittaja || Peliluettelo.Kaytossa(Pelaaja, Peliluettelo.Tavli, Laudat[i]);
        const string LautaAvain = "tavli-lauta";
        int lauta_ = -1;
        public int Lauta
        {
            get
            {
                if (lauta_ < 0) lauta_ = Mathf.Clamp(PlayerPrefs.GetInt(LautaAvain, 0), 0, Laudat.Length - 1);
                return LautaKaytossa(lauta_) ? lauta_ : 0;
            }
            set { lauta_ = Mathf.Clamp(value, 0, Laudat.Length - 1); PlayerPrefs.SetInt(LautaAvain, lauta_); PlayerPrefs.Save(); }
        }
        readonly Label tulosKapiteeli, tulosOtsikko, tulosApuri, tulosPalkkio, tulosKirjattu, tulosLaudat;
        readonly VisualElement otsikko, tulosPalkkioRivi;
        readonly Label otsikkoLauta;

        Tavli peli;
        Vastustaja vastustaja = Vastustaja.BottiNormaali;
        readonly List<TavliAskel> askeleet = new List<TavliAskel>();
        /// <summary>Valittu lähde: piste 0–23 tai Tavli.Palkki; −1 = ei valintaa.</summary>
        int valittu = -1;
        /// <summary>odottaa = nopat vierivät tai vuoro on vaihtumassa (ei syötettä).</summary>
        bool bottiMiettii, paattynyt, odottaa;
        int kerta;
        string botinTila = "", aloitusRivi;
        /// <summary>Testikomennon "heitto a b" seuraava heitto (kenen tahansa).</summary>
        (int A, int B)? pakotettu;
        readonly Satunnainen sat = new Satunnainen((long)DateTime.Now.Ticks);

        public bool Auki { get; private set; }
        const string PaneelinTeema = "tk-teema-paperi";

        TavliNakyma(UiKerros kerros)
        {
            juuri = kerros.Juuri(UiKerros.Pelidialogit);
            pysaytys = Rakenne.El("mk-peli__pysaytys", kerros.Juuri(PysaytysKerros), PickingMode.Ignore);
            pysaytys.style.display = DisplayStyle.None;
            PalloKierto.PysaytysValmis += t => { if (Auki) AsetaPysaytys(t); };
            PalloKierto.PysaytysPoistui += () => AsetaPysaytys(null);

            peliTaso = Rakenne.El("mk-himmennys mk-peli", juuri);
            peliTaso.style.display = DisplayStyle.None;
            lauta = new TavliLauta(Napautus);
            peliTaso.Add(lauta);
            otsikko = Rakenne.El("mk-juliste mk-peli__otsikko", peliTaso, PickingMode.Ignore);
            otsikko.style.position = Position.Absolute;
            Aloitusnakyma.Kapea(otsikko);
            Aloitusnakyma.Viiva(otsikko);
            Aloitusnakyma.JulisteRivi(otsikko, "TAVLI", "mk-juliste__nimi");
            otsikkoLauta = Aloitusnakyma.JulisteRivi(otsikko, "", "mk-juliste__osa");
            Aloitusnakyma.Viiva(otsikko);
            paneeli = Rakenne.El("mk-peli__paneeli " + PaneelinTeema, peliTaso);
            kapiteeli = Rakenne.Teksti("", "mk-kortti__kapiteeli", paneeli);
            Kirjasimet.Aseta(kapiteeli, Tyylikirja.Kirjain.Kapiteeli);
            vuoroRivi = Rakenne.Teksti("", "mk-peli__vuoro", paneeli);
            Kirjasimet.Aseta(vuoroRivi, Kirjasin.LukuLihava);
            (nimi0, lukema0) = PelaajaRivi("mk-peli__merkki--vaalea");
            (nimi1, lukema1) = PelaajaRivi("mk-peli__merkki--tumma");
            ohje = Rakenne.Teksti("", "mk-peli__ohje", paneeli);
            Kirjasimet.Aseta(ohje, Tyylikirja.Kirjain.Apuri);
            var napit = Rakenne.El("mk-kortti__napit", paneeli, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Nappi("Säännöt", "mk-nappi--toiminto", NaytaSaannot, napit), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Nappi("Luovuta", "mk-nappi--toiminto", Luovuta, napit), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Nappi("Poistu", "mk-nappi--toiminto", Sulje, napit), Kirjasin.Kone);
            peliTaso.RegisterCallback<GeometryChangedEvent>(_ => Asettele());

            korttiTaso = Rakenne.El("mk-himmennys mk-himmennys--tumma", juuri);
            korttiTaso.style.display = DisplayStyle.None;

            valintaKortti = new Kortti("mk-peli__kortti", pohja: true);
            var vk = Rakenne.Teksti("", "mk-kortti__kapiteeli mk-peli__valinta-kapiteeli", valintaKortti.Sisus);
            Kirjasimet.Aseta(vk, Tyylikirja.Kirjain.Kapiteeli);
            Kirjasimet.Aseta(Rakenne.Teksti("Pelataanko tavlia?", "mk-kortti__otsikko", valintaKortti.Sisus), Tyylikirja.Kirjain.Otsikko);
            var ala = Rakenne.Teksti("", "mk-kortti__alaotsikko mk-peli__valinta-ala", valintaKortti.Sisus);
            Kirjasimet.Aseta(ala, Tyylikirja.Kirjain.Apuri);
            Rakenne.Teksti("Kaksi noppaa, 15 nappulaa kummallakin. Kuljeta nappulasi kotialueellesi ja poista ne laudalta: ensin kaikki poistanut voittaa. Yksinäinen nappula voidaan lyödä palkille.",
                "mk-kortti__teksti", valintaKortti.Sisus);
            var vo = Rakenne.Teksti("Vastustaja", "mk-peli__valiotsikko", valintaKortti.Sisus);
            Kirjasimet.Aseta(vo, Tyylikirja.Kirjain.Valiotsikko);
            var ryhma = Rakenne.El("mk-peli__kytkinryhma", valintaKortti.Sisus);
            foreach (var (teksti, v) in new[] { ("Helppo botti", Vastustaja.BottiHelppo), ("Normaali", Vastustaja.BottiNormaali), ("Vaikea", Vastustaja.BottiVaikea) })
                tasoNapit.Add(Kirjasimet.Aseta(Rakenne.Nappi(teksti, "mk-peli__kytkin", () => ValitseVastustaja(v), ryhma), Kirjasin.Luku));
            var kaveriRyhma = Rakenne.El("mk-peli__kytkinryhma", valintaKortti.Sisus);
            tasoNapit.Add(Kirjasimet.Aseta(Rakenne.Nappi("Kaveri samalla laitteella", "mk-peli__kytkin", () => ValitseVastustaja(Vastustaja.Kaveri), kaveriRyhma), Kirjasin.Luku));
            var lo = Rakenne.Teksti("Lauta", "mk-peli__valiotsikko", valintaKortti.Sisus);
            Kirjasimet.Aseta(lo, Tyylikirja.Kirjain.Valiotsikko);
            var lautaRyhma = Rakenne.El("mk-peli__kytkinryhma", valintaKortti.Sisus);
            for (int i = 0; i < Laudat.Length; i++)
            {
                int ii = i;
                lautaNapit.Add(Kirjasimet.Aseta(Rakenne.Nappi(Laudat[i].Nimi, "mk-peli__kytkin", () => ValitseLauta(ii), lautaRyhma), Kirjasin.Luku));
            }
            lautaHistoria = Rakenne.Teksti("", "mk-kortti__alaotsikko mk-peli__historia", valintaKortti.Sisus);
            Kirjasimet.Aseta(lautaHistoria, Tyylikirja.Kirjain.Apuri);
            var vn = Rakenne.El("mk-kortti__napit", valintaKortti.Sisus, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Nappi("Peruuta", "mk-nappi--toiminto", Sulje, vn), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Nappi("Aloita peli", "mk-nappi--kulta", AloitaPeli, vn), Kirjasin.KoneLihava);

            tulosKortti = new Kortti("mk-peli__kortti", pohja: true);
            tulosKapiteeli = Rakenne.Teksti("", "mk-kortti__kapiteeli", tulosKortti.Sisus);
            Kirjasimet.Aseta(tulosKapiteeli, Tyylikirja.Kirjain.Kapiteeli);
            tulosOtsikko = Rakenne.Teksti("", "mk-kortti__otsikko", tulosKortti.Sisus);
            Kirjasimet.Aseta(tulosOtsikko, Tyylikirja.Kirjain.Otsikko);
            tulosApuri = Rakenne.Teksti("", "mk-kortti__alaotsikko", tulosKortti.Sisus);
            Kirjasimet.Aseta(tulosApuri, Tyylikirja.Kirjain.Apuri);
            tulosPalkkioRivi = Rakenne.El("mk-peli__rivi", tulosKortti.Sisus, PickingMode.Ignore);
            Rakenne.Teksti("Voittopalkkio", "mk-peli__rivi-nimi", tulosPalkkioRivi);
            tulosPalkkio = Rakenne.Teksti("", "mk-peli__palkkio", tulosPalkkioRivi);
            Kirjasimet.Aseta(tulosPalkkio, Tyylikirja.Kirjain.Valiotsikko);
            tulosLaudat = Rakenne.Teksti("", "mk-kortti__teksti mk-peli__ansaitut", tulosKortti.Sisus);
            Kirjasimet.Aseta(tulosLaudat, Kirjasin.LukuLihava);
            tulosKirjattu = Rakenne.Teksti("Tulos kirjattiin matkakirjaan.", "mk-kortti__alaotsikko mk-peli__kirjattu", tulosKortti.Sisus);
            Kirjasimet.Aseta(tulosKirjattu, Tyylikirja.Kirjain.Apuri);
            var tn = Rakenne.El("mk-kortti__napit", tulosKortti.Sisus, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Nappi("Pelaa uudelleen", "mk-nappi--toiminto", () => NaytaKortti(valintaKortti), tn), Kirjasin.Kone);
            Kirjasimet.Aseta(Rakenne.Nappi("Jatka matkaa", "mk-nappi--kulta", Sulje, tn), Kirjasin.KoneLihava);

            Kirjasimet.Aseta(peliTaso, Kirjasin.Luku);
            Kirjasimet.Aseta(korttiTaso, Kirjasin.Luku);
        }

        (Label, Label) PelaajaRivi(string merkkiLuokka)
        {
            var rivi = Rakenne.El("mk-peli__rivi", paneeli, PickingMode.Ignore);
            Rakenne.El("mk-peli__merkki " + merkkiLuokka, rivi, PickingMode.Ignore);
            var n = Rakenne.Teksti("", "mk-peli__rivi-nimi", rivi);
            var l = Rakenne.Teksti("", "mk-peli__lukema", rivi);
            Kirjasimet.Aseta(l, Tyylikirja.Kirjain.Kapiteeli);
            return (n, l);
        }

        // --- avaus ja sulku ------------------------------------------------------------------------------------------

        public void Avaa(string paikka = null)
        {
            if (paikka != null) Paikka = paikka;
            Auki = true;
            SyoteLukko.Esta(this);
            UiKerros.Hae().Juuri(Pulu.Kerros).style.visibility = Visibility.Hidden;
            Lipputanko.Piilota(this, true);
            Pehmenna(true);
            if (PalloKierto.Pysaytyskuva != null) AsetaPysaytys(PalloKierto.Pysaytyskuva);
            peli ??= new Tavli();
            lauta.Lataa();
            foreach (var n in KaikkiAanet) RekisteroiAani(n);
            Paivita();
            peliTaso.style.display = DisplayStyle.Flex;
            Rakenne.Nayta(peliTaso, true, Tyylikirja.Kesto.Avaus);
            NaytaKortti(valintaKortti);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            kerta++;
            bottiMiettii = false; odottaa = false;
            Rakenne.Nayta(korttiTaso, false, Tyylikirja.Kesto.Sulku);
            Rakenne.Nayta(peliTaso, false, Tyylikirja.Kesto.Sulku);
            SyoteLukko.Vapauta(this);
            UiKerros.Hae().Juuri(Pulu.Kerros).style.visibility = StyleKeyword.Null;
            Lipputanko.Piilota(this, false);
            Pehmenna(false);
            int k = kerta;
            lauta.schedule.Execute(() =>
            {
                if (Auki || k != kerta) return;
                lauta.Pura();
                foreach (var n in KaikkiAanet) Aanet.RekisteroiTehoste(n, (AudioClip)null);
                Resources.UnloadUnusedAssets();
            }).StartingIn(Tyylikirja.Kesto.Sulku + 50);
        }

        // ÄÄNET (Pelikoodari 5.10., _valmiit/tavli-aanet-vienti-20261005, Freesound CC0, huiput −6 dBFS, isku 1 ms): noppien kolina
        // kolmena muunnelmana (arvotaan heitossa), napsahdus siirrossa, lyönti, poisto, voitto ja häviö. Vahvistus 2,7 = Myllyn
        // lisä-äänten 1,6 × 1,68 (sama −6 dBFS:n lähtötaso), omaIsku (ei webin nousuverhoa, joka söi Myllyn naksujen iskun).
        const string AaniSiirto = "tavli-siirto", AaniLyonti = "tavli-lyonti", AaniPoisto = "tavli-poisto", AaniVoitto = "tavli-voitto", AaniHavio = "tavli-havio";
        static readonly string[] AaniNopat = { "tavli-noppa-1", "tavli-noppa-2", "tavli-noppa-3" };
        static readonly string[] KaikkiAanet = { "tavli-noppa-1", "tavli-noppa-2", "tavli-noppa-3", AaniSiirto, AaniLyonti, AaniPoisto, AaniVoitto, AaniHavio };
        const float Vahvistus = 2.7f;

        static void RekisteroiAani(string nimi)
        {
            var c = Resources.Load<AudioClip>(TavliLauta.Kansio + nimi);
            if (c == null) { Debug.LogWarning("MATKAKIRJA tavli: ääni puuttuu " + nimi); return; }
            if (c.loadState != AudioDataLoadState.Loaded) c.LoadAudioData();
            Aanet.RekisteroiTehoste(nimi, c, Vahvistus, omaIsku: true);
        }

        /// <summary>Askeleen ääni nappulan laskeutuessa (liu'un lopussa): lyönti, poisto tai napsahdus.</summary>
        static void AskelAani(TavliAskel s, float voima)
        {
            float lasku = Tyylikirja.Kesto.Liuku / 1000f * 0.9f;
            string nimi = s.Lyonti ? AaniLyonti : s.Poisto ? AaniPoisto : AaniSiirto;
            bool oma = Aanet.Tehoste(nimi, voima, lasku);
            if (!oma) Aanet.Tehoste(s.Lyonti ? "wrong" : "click", voima, lasku);
            Debug.Log("MATKAKIRJA tavli: ääni " + (oma ? nimi : "click") + " (" + s + ")");
        }

        /// <summary>Taustan pehmennys kuten Myllyssä (UI-kerrosten blur 4 pt).</summary>
        static void Pehmenna(bool paalle)
        {
            var k = UiKerros.Hae();
            foreach (int kerros in new[] { UiKerros.Nostot, UiKerros.Tilarivi, UiKerros.Matkavalinta })
            {
                var j = k.Juuri(kerros);
                if (!paalle) { j.style.filter = StyleKeyword.Null; continue; }
                var f = new FilterFunction(FilterFunctionType.Blur);
                f.AddParameter(new FilterParameter(4f));
                j.style.filter = new List<FilterFunction> { f };
            }
        }

        void AsetaPysaytys(Texture t)
        {
            if (t == null) { pysaytys.style.backgroundImage = StyleKeyword.None; pysaytys.style.display = DisplayStyle.None; return; }
            var tausta = t is RenderTexture rt ? Background.FromRenderTexture(rt) : t is Texture2D t2 ? Background.FromTexture2D(t2) : default;
            pysaytys.style.backgroundImage = new StyleBackground(tausta);
            pysaytys.style.display = DisplayStyle.Flex;
        }

        void NaytaKortti(Kortti k)
        {
            if (k.parent != korttiTaso)
            {
                korttiTaso.Clear();
                korttiTaso.Add(k);
                korttiTaso.RemoveFromClassList("mk-auki");
            }
            if (k == valintaKortti)
            {
                valintaKortti.Q<Label>(className: "mk-peli__valinta-kapiteeli").text = Maa != null ? Maa + " · kohtaaminen" : "Tavli · uusintapeli";
                valintaKortti.Q<Label>(className: "mk-peli__valinta-ala").text = PaikallinenNimi != null
                    ? $"Täällä peliä kutsutaan nimellä {PaikallinenNimi}."
                    : "Tavlin perusmuoto Portes on sama peli kuin backgammon.";
                ValitseVastustaja(vastustaja);
                ValitseLauta(Lauta);
            }
            korttiTaso.style.display = DisplayStyle.Flex;
            Rakenne.Nayta(korttiTaso, true, Tyylikirja.Kesto.Avaus);
        }

        void PiilotaKortti() => Rakenne.Nayta(korttiTaso, false, Tyylikirja.Kesto.Sulku);

        void ValitseVastustaja(Vastustaja v)
        {
            vastustaja = v;
            for (int i = 0; i < tasoNapit.Count; i++) tasoNapit[i].EnableInClassList("mk-valittu", i == (int)v);
        }

        void ValitseLauta(int i)
        {
            bool kaytossa = LautaKaytossa(i);
            if (kaytossa) Lauta = i;
            for (int k = 0; k < lautaNapit.Count; k++)
            {
                lautaNapit[k].EnableInClassList("mk-valittu", k == Lauta);
                lautaNapit[k].EnableInClassList("mk-peli__kytkin--lukittu", !LautaKaytossa(k));
            }
            lautaHistoria.text = kaytossa ? Laudat[Lauta].Historia : Laudat[i].Nimi + " · " + Laudat[i].Ehto;
            lauta.AsetaLauta(Laudat[Lauta].Id);
        }

        /// <summary>Uusi erä: aloitusheitto (eri silmäluvut; suurempi aloittaa ja pelaa ensimmäisen vuoronsa näillä nopilla).</summary>
        public void AloitaPeli()
        {
            kerta++;
            int a, b;
            do { a = 1 + (int)(sat.Seuraava() * 6); b = 1 + (int)(sat.Seuraava() * 6); } while (a == b);
            if (pakotettu is (int pa, int pb) && pa != pb) { a = pa; b = pb; pakotettu = null; }
            int aloittaja = a > b ? 0 : 1;
            peli = new Tavli(aloittaja);
            paattynyt = false; bottiMiettii = false; odottaa = false; valittu = -1;
            lauta.Nopat.Piilota();
            bool kaveri = vastustaja == Vastustaja.Kaveri;
            aloitusRivi = $"Aloitusheitto: {(kaveri ? "vaalea" : "sinä")} {a}, {(kaveri ? "tumma" : "botti")} {b}. "
                + (aloittaja == 0 ? (kaveri ? "Vaalea aloittaa" : "Sinä aloitat") : (kaveri ? "Tumma aloittaa" : "Botti aloittaa")) + " näillä nopilla.";
            PiilotaKortti();
            Paivita();
            pakotettu = (Math.Max(a, b), Math.Min(a, b));
            if (BotinVuoro) UiKerros.Hae().StartCoroutine(BotinVuoroK(kerta));
            else HeitaIhminen();
        }

        // --- vuorot ---------------------------------------------------------------------------------------------------

        bool Kaveri => vastustaja == Vastustaja.Kaveri;
        bool BotinVuoro => !Kaveri && peli.Vuorossa == 1;
        bool IhmisenVuoro => peli != null && !paattynyt && !bottiMiettii && !odottaa && !BotinVuoro;

        /// <summary>Napautus laudalla: piste 0–23, Tavli.Palkki, Tavli.Pois tai −1 (muualla laudalla).</summary>
        void Napautus(int kohde)
        {
            if (!IhmisenVuoro) return;
            if (!peli.Heitetty) { HeitaIhminen(); return; }
            peli.LaillisetAskeleet(askeleet);
            if (askeleet.Count == 0) return;
            if (valittu >= 0 && kohde >= 0 && kohde != valittu)
            {
                var s = peli.EtsiAskel(valittu, kohde);
                if (s.HasValue) { Tee(s.Value); return; }
                // OSUMA-ALA (Päätoimittaja 5.10.: kolmio ~21 pt pystyssä): valitun nappulan kohde hyväksyy myös viereisen sarakkeen
                // (± 1, sama rivi, lähin napautuskohtaan), ellei napautettu piste ole itse valittava oma nappula. Ei visuaalista muutosta.
                if (kohde < Tavli.Pisteita && !askeleet.Exists(a => a.Mista == kohde) && Lahin(kohde) is TavliAskel l) { Tee(l); return; }
            }
            if (kohde >= 0 && kohde != Tavli.Pois && askeleet.Exists(a => a.Mista == kohde))
            {
                valittu = kohde == valittu ? -1 : kohde;
                Aanet.Tehoste("click", 0.5f);
                Paivita();
                return;
            }
            if (valittu >= 0) { valittu = -1; Paivita(); }
        }

        TavliAskel? Lahin(int kohde)
        {
            TavliAskel? paras = null; float etaisyys = float.MaxValue;
            foreach (int d in new[] { -1, 1 })
            {
                int n = kohde + d;
                if (n < 0 || n >= Tavli.Pisteita || (n < 12) != (kohde < 12)) continue;
                var s = peli.EtsiAskel(valittu, n);
                float e = Mathf.Abs(lauta.SarakeX(n) - lauta.ViimeX);
                if (s.HasValue && e < etaisyys) { paras = s; etaisyys = e; }
            }
            if (paras.HasValue) Debug.Log($"MATKAKIRJA tavli: osuma-ala: a{kohde} → a{paras.Value.Mihin}");
            return paras;
        }

        /// <summary>Heittää vuorossa olevan nopat (pakotettu heitto tai Satunnainen) ja käynnistää vierinnän; palauttaa keston.</summary>
        float Heita()
        {
            aloitusRivi = peli.Siirtoja == 0 && peli.TehdytAskeleet.Count == 0 ? aloitusRivi : null;
            if (pakotettu is (int a, int b)) { pakotettu = null; peli.AsetaHeitto(a, b); }
            else peli.Heita(sat);
            int p = peli.Vuorossa;
            lauta.Nopat.Heita(peli.Noppa1, peli.Noppa2, p);
            string aani = AaniNopat[UnityEngine.Random.Range(0, AaniNopat.Length)];
            float isku = lauta.Nopat.Toimii ? TavliNopat.Kesto * TavliNopat.EnsimmainenIsku : 0f;
            if (!Aanet.Tehoste(aani, 1f, isku)) Aanet.Tehoste("click", 1f);
            Debug.Log($"MATKAKIRJA tavli: heitto {peli.Noppa1} {peli.Noppa2} ({(p == 0 ? "vaalea" : "tumma")}), askeleita {peli.AskeleitaVuorossa}; ääni {aani}");
            valittu = -1;
            return lauta.Nopat.Toimii ? TavliNopat.Kesto + 0.1f : 0.35f;
        }

        void HeitaIhminen()
        {
            odottaa = true;
            float kesto = Heita();
            Paivita();
            int k = kerta;
            UiKerros.Hae().StartCoroutine(Viive(kesto, () =>
            {
                if (k != kerta) return;
                if (peli.AskeleitaVuorossa == 0) { VuoroLoppuu(1.4f); return; }
                odottaa = false;
                AutoValinta();
                Paivita();
            }));
        }

        /// <summary>Palkilla oleva nappula valitaan valmiiksi (palkilta on tultava sisään ennen muita siirtoja).</summary>
        void AutoValinta()
        {
            if (!peli.Heitetty || peli.Palkilla(peli.Vuorossa) == 0) return;
            peli.LaillisetAskeleet(askeleet);
            if (askeleet.Exists(a => a.Mista == Tavli.Palkki)) valittu = Tavli.Palkki;
        }

        void Tee(TavliAskel s)
        {
            int p = peli.Vuorossa;
            var tehty = peli.TeeAskel(s);
            lauta.Animoi(tehty, p);
            AskelAani(tehty, 1f);
            valittu = -1;
            AutoValinta();
            Paivita();
            if (TarkistaLoppu()) return;
            if (peli.VoiLopettaa()) VuoroLoppuu(0.6f);
        }

        /// <summary>Vuoro valmis (tai ei siirtoja): lyhyen viiveen jälkeen LopetaVuoro ja seuraava vuoro.</summary>
        void VuoroLoppuu(float viive)
        {
            odottaa = true;
            Paivita();
            int k = kerta;
            UiKerros.Hae().StartCoroutine(Viive(viive, () =>
            {
                if (k != kerta) return;
                peli.LopetaVuoro();
                odottaa = false;
                SeuraavaVuoro();
            }));
        }

        void SeuraavaVuoro()
        {
            valittu = -1;
            if (TarkistaLoppu()) return;
            Paivita();
            if (BotinVuoro) UiKerros.Hae().StartCoroutine(BotinVuoroK(kerta));
        }

        static System.Collections.IEnumerator Viive(float s, Action toimi)
        {
            yield return new WaitForSecondsRealtime(s);
            toimi();
        }

        /// <summary>Botin vuoro: heitto, kokonainen vuoro taustasäikeessä (TavliBotti.Valitse ei muuta peliä), askeleet animoiden.</summary>
        System.Collections.IEnumerator BotinVuoroK(int k)
        {
            bottiMiettii = true;
            botinTila = "Botti heittää…";
            Paivita();
            yield return new WaitForSecondsRealtime(0.45f);
            if (k != kerta || !Auki) yield break;
            float kesto = Heita();
            Paivita();
            yield return new WaitForSecondsRealtime(kesto);
            if (k != kerta || !Auki) yield break;
            string heitto = $"{peli.Noppa1} ja {peli.Noppa2}";
            if (peli.AskeleitaVuorossa == 0)
            {
                botinTila = $"Botti heitti {heitto}: ei laillisia siirtoja.";
                Paivita();
                yield return new WaitForSecondsRealtime(1.4f);
                if (k != kerta || !Auki) yield break;
                peli.LopetaVuoro();
                bottiMiettii = false;
                SeuraavaVuoro();
                yield break;
            }
            botinTila = $"Botti miettii ({heitto})…";
            Paivita();
            float alku = Time.realtimeSinceStartup;
            var taso = vastustaja;
            var tehtava = Task.Run(() => TavliBotti.Valitse(peli, taso, sat));
            while (!tehtava.IsCompleted || Time.realtimeSinceStartup - alku < 0.35f) yield return null;
            if (k != kerta || !Auki) yield break;
            TavliVuoro vuoro;
            if (tehtava.IsFaulted) { Debug.LogError("MATKAKIRJA tavli: botti " + tehtava.Exception); vuoro = peli.LaillisetVuorot()[0]; }
            else vuoro = tehtava.Result;
            Debug.Log("MATKAKIRJA tavli: botti " + vuoro);
            botinTila = $"Botti siirtää ({heitto}).";
            foreach (var s in vuoro.Askeleet)
            {
                var tehty = peli.TeeAskel(s);
                lauta.Animoi(tehty, 1);
                AskelAani(tehty, 0.8f);
                Paivita();
                if (TarkistaLoppu()) yield break;
                yield return new WaitForSecondsRealtime(0.55f);
                if (k != kerta || !Auki) yield break;
            }
            peli.LopetaVuoro();
            bottiMiettii = false;
            SeuraavaVuoro();
        }

        bool TarkistaLoppu()
        {
            var t = peli.Lopputulos();
            if (!t.HasValue) return false;
            Lopeta(t.Value);
            return true;
        }

        void Luovuta()
        {
            if (paattynyt) { Sulje(); return; }
            Lopeta(-2);
        }

        void Lopeta(int voittaja)
        {
            paattynyt = true; bottiMiettii = false; odottaa = false; kerta++;
            int vuoroja = peli.Siirtoja + 1;
            var tulos = new PeliTulos
            {
                PeliId = Peliluettelo.Tavli.Id, Nimi = "Tavli", PaikallinenNimi = PaikallinenNimi, Paikka = Paikka, Vastustaja = vastustaja,
                Voittaja = voittaja, Siirtoja = vuoroja, Paiva = DateTime.Now.ToString("yyyy-MM-dd"),
            };
            int palkkio = 0;
            var matka = PeliOhjain.Instanssi != null ? PeliOhjain.Instanssi.Matka : null;
            var ansaitut = new List<PeliLauta>();
            if (matka != null) { var k = Pelikehys.Kirjaa(matka, tulos, PelinTalous.Minipeli); palkkio = k.Palkkio; ansaitut = k.Laudat; }
            Debug.Log("MATKAKIRJA tavli: " + Pelikehys.Matkakirjarivi(tulos) + (palkkio > 0 ? $" +£{palkkio}" : ""));
            string loppuAani = voittaja < 0 ? null : Kaveri || voittaja == 0 ? AaniVoitto : AaniHavio;
            if (loppuAani != null) { Aanet.Tehoste(loppuAani, 1f, 0.35f); Debug.Log("MATKAKIRJA tavli: ääni " + loppuAani); }
            Paivita();

            int laji = voittaja >= 0 ? peli.Voittolaji() : 0;
            tulosKapiteeli.text = "Tavli · " + (voittaja == -2 ? "luovutus" : Kaveri || voittaja == 0 ? "voitto" : "tappio");
            tulosOtsikko.text = voittaja == -2 ? "Luovutit tämän pelin"
                : Kaveri ? (voittaja == 0 ? "Vaalea voitti!" : "Tumma voitti!")
                : voittaja == 0 ? "Voitit tavlin!" : "Botti voitti tällä kertaa";
            string vast = Pelikehys.VastustajanNimi(vastustaja);
            string mars = laji >= 2 ? " Mars: hävinnyt ei ehtinyt poistaa yhtään nappulaa." : "";
            tulosApuri.text = (Kaveri ? $"Kaveripeli, {vuoroja} vuoroa."
                : voittaja == 0 ? $"Voitit {(vast.StartsWith("botti") ? "botin" + vast.Substring(5) : vast)} {vuoroja} vuorossa."
                : $"Vastassa {vast}, {vuoroja} vuoroa.") + mars;
            tulosPalkkioRivi.style.display = palkkio > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            tulosPalkkio.text = $"+£{palkkio}";
            tulosKirjattu.style.display = matka != null ? DisplayStyle.Flex : DisplayStyle.None;
            tulosLaudat.text = string.Join("\n", ansaitut.ConvertAll(l => l.Avautuu == null ? l.Esine + " tallentui Peleihin." : "Uusi lauta: " + l.Nimi + "."));
            tulosLaudat.style.display = ansaitut.Count > 0 ? DisplayStyle.Flex : DisplayStyle.None;
            Aanet.Tehoste(palkkio > 0 ? "coin" : voittaja == 0 || Kaveri ? "correct" : "wrong");
            UiKerros.Hae().StartCoroutine(Viive(0.9f, () => { if (Auki) NaytaKortti(tulosKortti); }));
        }

        // Sääntöteksti: osumataulukko 1–12 tarkistettu kaikilla 36 heitolla (docs/raportit/tavli-historiatekstit-20261005.md osio 7).
        void NaytaSaannot()
        {
            UiNakymat.Hae().Vahvistus.Kysy("Tavlin säännöt",
                "Heitä kaksi noppaa ja siirrä nappuloita silmälukujen verran; tuplat siirretään neljästi. Molemmat nopat on käytettävä, " +
                "jos voi, muuten suurempi. Pisteeseen, jossa on kaksi vastustajan nappulaa, ei saa siirtää. Yksinäisen nappulan voi " +
                "lyödä palkille, ja palkilta on tultava sisään ennen muita siirtoja. Kun kaikki 15 ovat kotialueella, ne poistetaan.\n\n" +
                "Kahdella nopalla on 36 yhtä todennäköistä heittoa. Summa 7 on yleisin (6 tapaa), mutta lähelle osuu helpommin, koska " +
                "yksi noppa riittää. Osumat 36:sta etäisyyden mukaan: 1 → 11, 2 → 12, 3 → 14, 4 → 15, 5 → 15, 6 → 17, 7 → 6, 8 → 6, " +
                "9 → 5, 10 → 3, 11 → 2, 12 → 3.",
                "Sulje", "Jatka peliä", null, "Tavli · Portes · backgammon");
        }

        // --- näyttö ---------------------------------------------------------------------------------------------------

        void Paivita()
        {
            if (peli == null) return;
            kapiteeli.text = (PaikallinenNimi ?? "") + (PaikallinenNimi != null && Maa != null ? " · " : "") + (Maa ?? "");
            kapiteeli.style.display = string.IsNullOrEmpty(kapiteeli.text) ? DisplayStyle.None : DisplayStyle.Flex;
            otsikkoLauta.text = Laudat[Lauta].Nimi.ToUpperInvariant();
            nimi0.text = Kaveri ? "Vaalea" : "Sinä";
            nimi1.text = Kaveri ? "Tumma" : Pelikehys.VastustajanNimi(vastustaja).Replace("botti (", "Botti · ").TrimEnd(')');
            lukema0.text = Lukema(0); lukema1.text = Lukema(1);
            int oma = peli.Vuorossa;
            string kuka = Kaveri ? (oma == 0 ? "Vaalea" : "Tumma") : "Sinun vuorosi";
            int riskinen = Kaveri ? oma : 0;
            bool ihminen = IhmisenVuoro;
            if (ihminen && peli.Heitetty) peli.LaillisetAskeleet(askeleet); else askeleet.Clear();
            if (paattynyt) { vuoroRivi.text = "Peli päättyi."; ohje.text = ""; }
            else if (bottiMiettii) { vuoroRivi.text = botinTila; ohje.text = RiskiRivi(0) ?? ""; }
            else if (!peli.Heitetty) { vuoroRivi.text = $"{kuka}: napauta lautaa ja heitä nopat."; ohje.text = aloitusRivi ?? RiskiRivi(riskinen) ?? "Kuljeta 15 nappulaa kotialueellesi ja poista ne laudalta."; }
            else if (odottaa && peli.AskeleitaVuorossa == 0) { vuoroRivi.text = $"{kuka}: {peli.Noppa1} ja {peli.Noppa2}, ei laillisia siirtoja."; ohje.text = "Vuoro siirtyy."; }
            else if (odottaa) { vuoroRivi.text = $"{kuka}: {HeittoTeksti()}"; ohje.text = aloitusRivi ?? RiskiRivi(riskinen) ?? ""; }
            else
            {
                vuoroRivi.text = $"{kuka}: {HeittoTeksti()} · {(valittu >= 0 ? "valitse kohde." : "valitse nappula.")}";
                ohje.text = RiskiRivi(riskinen) ?? (askeleet.Exists(a => a.Poisto) ? "Kaikki kotona: napauta nappulaa ja sitten poistolokeroa."
                    : "Napauta omaa nappulaa ja sitten korostettua kohdetta.");
            }
            ohje.style.display = string.IsNullOrEmpty(ohje.text) ? DisplayStyle.None : DisplayStyle.Flex;

            var kohteet = new List<int>();
            if (ihminen && valittu >= 0)
                foreach (var s in askeleet) if (s.Mista == valittu && !kohteet.Contains(s.Mihin)) kohteet.Add(s.Mihin);
            HimmennaNopat();
            lauta.Aseta(peli, valittu, kohteet);
        }

        /// <summary>"5 ja 3" (+ jäljellä olevat, kun askelia on jo tehty).</summary>
        string HeittoTeksti()
        {
            string t = $"{peli.Noppa1} ja {peli.Noppa2}";
            if (peli.TehdytAskeleet.Count > 0 && peli.Jaljella.Count > 0) t += ", jäljellä " + string.Join(" ja ", peli.Jaljella);
            return t;
        }

        void HimmennaNopat()
        {
            if (!peli.Heitetty) { lauta.Nopat.Himmenna(true, true); return; }
            var tehdyt = peli.TehdytAskeleet;
            if (peli.Noppa1 == peli.Noppa2) { lauta.Nopat.Himmenna(tehdyt.Count >= 2, tehdyt.Count >= 4); return; }
            bool eka = false, toka = false;
            foreach (var s in tehdyt) { if (s.Noppa == peli.Noppa1) eka = true; else if (s.Noppa == peli.Noppa2) toka = true; }
            lauta.Nopat.Himmenna(eka, toka);
        }

        string Lukema(int p)
        {
            string t = $"pip {peli.Pip(p)} · {peli.Poistettu(p)} pois";
            return peli.Palkilla(p) > 0 ? t + $" · {peli.Palkilla(p)} palkilla" : t;
        }

        /// <summary>OPPIMISEN KÄRKI (suunnitelma kohta 2): sisääntulo palkilta tai riskialttein yksinäinen nappula
        /// (Tavli.SisaantuloTodennakoisyys, Tavli.Yksinaiset = täysi 36 heiton luettelo; Tavli.Murtoluku). null = ei kerrottavaa.</summary>
        string RiskiRivi(int p)
        {
            if (peli.Palkilla(p) > 0)
            {
                int k = peli.SuljetutSisaantulot(p);
                int n = Tavli.SisaantuloTodennakoisyys(k);
                return k == 0 ? "Palkilta sisään: vastustajan kotialue on auki, pääset sisään millä tahansa heitolla."
                    : $"Vastustaja on sulkenut {k} kotipistettä: pääset palkilta sisään {Tavli.Murtoluku(n)}.";
            }
            int piste = -1, osumat = 0, maara = 0;
            foreach (var (x, o) in peli.Yksinaiset(p))
            {
                if (o <= 0) continue;
                maara++;
                if (o > osumat) { osumat = o; piste = x; }
            }
            if (piste < 0) return null;
            int d = Etaisyys(piste, 1 - p);
            string paassa = d < 99 ? $" {d} pisteen päässä" : "";
            return $"Yksinäinen nappula{paassa}: {(Kaveri ? "toinen" : "vastustaja")} osuu {Tavli.Murtoluku(osumat)}." + (maara > 1 ? $" Yksinäisiä {maara}." : "");
        }

        /// <summary>Lähimmän ampujan etäisyys kohteeseen ampujan kulkusuunnassa (palkilta sisääntulo mukaan); 99 = ei ampujaa.</summary>
        int Etaisyys(int piste, int ampuja)
        {
            int paras = 99;
            if (peli.Palkilla(ampuja) > 0) paras = ampuja == 1 ? piste + 1 : 24 - piste;
            for (int x = 0; x < Tavli.Pisteita; x++)
                if (peli.Omistaja(x) == ampuja)
                {
                    int d = ampuja == 1 ? piste - x : x - piste;
                    if (d > 0 && d < paras) paras = d;
                }
            return paras;
        }

        void Asettele()
        {
            float w = peliTaso.layout.width, h = peliTaso.layout.height;
            if (float.IsNaN(w) || w <= 0 || h <= 0) return;
            var t = UiKerros.Hae().Reunat(UiKerros.Pelidialogit);
            float m = Tyylikirja.Vali.M;
            float oKork = float.IsNaN(otsikko.layout.height) || otsikko.layout.height <= 0 ? 104f : otsikko.layout.height;
            float ylin = t.y + Ylapalkki.Varaus + m;
            const float Suhde = 3f / 4f; // lauta 2048 × 1536
            bool kapea = Pohja.Leveys(w - t.x - t.z) == Pohja.Luokka.Kapea && h > w;
            if (kapea)
            {
                // Pystyssä: lauta sovitetaan leveyteen, paneeli alle.
                float yla = ylin + oKork;
                float pKork = float.IsNaN(paneeli.layout.height) || paneeli.layout.height <= 0 ? 300f : paneeli.layout.height;
                float lw = Mathf.Min(w - t.x - t.z - 2 * m, (h - yla - t.w - pKork - 2 * m) / Suhde);
                Sijoita(lauta, (w - lw) / 2f, yla, lw, lw * Suhde);
                SijoitaOtsikko(w / 2f, ylin, w - t.x - t.z);
                paneeli.style.left = t.x + m; paneeli.style.right = t.z + m; paneeli.style.width = StyleKeyword.Auto;
                paneeli.style.top = yla + lw * Suhde + m; paneeli.style.bottom = StyleKeyword.Auto;
            }
            else
            {
                // Vaakana ja iPadilla: lauta sovitetaan korkeuteen, paneeli oikealla.
                float pw = Tyylikirja.Leveys.Paneeli;
                float lh = Mathf.Min(h - ylin - t.w - m - oKork, (w - t.x - t.z - pw - 3 * m) * Suhde);
                float lw = lh / Suhde;
                float vasen = t.x + m + Mathf.Max(0, (w - t.x - t.z - pw - 3 * m - lw) / 2f);
                Sijoita(lauta, vasen, ylin + oKork, lw, lh);
                SijoitaOtsikko(vasen + lw / 2f, ylin, lw);
                paneeli.style.left = StyleKeyword.Auto; paneeli.style.right = t.z + m; paneeli.style.width = pw;
                paneeli.style.top = ylin + oKork; paneeli.style.bottom = StyleKeyword.Auto;
            }
        }

        void SijoitaOtsikko(float keskiX, float yla, float leveys)
        {
            otsikko.style.width = Mathf.Round(leveys); otsikko.style.maxWidth = StyleKeyword.None;
            otsikko.style.left = Mathf.Round(keskiX - leveys / 2f); otsikko.style.top = Mathf.Round(yla);
        }

        static void Sijoita(VisualElement e, float x, float y, float w, float h)
        {
            e.style.left = Mathf.Round(x); e.style.top = Mathf.Round(y); e.style.width = Mathf.Round(w); e.style.height = Mathf.Round(h);
        }

        // --- testikomento ---------------------------------------------------------------------------------------------

        static int Kohde(string s) => s switch { "palkki" => Tavli.Palkki, "pois" => Tavli.Pois, "lauta" => -1, _ => int.Parse(s.TrimStart('a')) };

        public string Komento(string loput)
        {
            var o = (loput ?? "").Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            string k = o.Length > 0 ? o[0] : "valinta";
            switch (k)
            {
                case "valinta": Avaa(); return "tavli: valinta";
                case "peli":
                    if (!Auki) Avaa();
                    if (o.Length > 1) ValitseVastustaja(o[1] switch { "helppo" => Vastustaja.BottiHelppo, "vaikea" => Vastustaja.BottiVaikea, "kaveri" => Vastustaja.Kaveri, _ => Vastustaja.BottiNormaali });
                    AloitaPeli();
                    return "tavli: peli " + vastustaja + " | " + aloitusRivi;
                case "heitto" when o.Length >= 3:
                {
                    // Seuraava heitto (kenen tahansa); ihmisen heittämättä vuorolla heitetään heti.
                    int a = int.Parse(o[1]), b = int.Parse(o[2]);
                    if (a < 1 || a > 6 || b < 1 || b > 6) return "tavli: noppa 1–6";
                    pakotettu = (a, b);
                    if (IhmisenVuoro && !peli.Heitetty) { HeitaIhminen(); return $"tavli: heitto {a} {b}, askeleita {peli.AskeleitaVuorossa}"; }
                    return $"tavli: seuraava heitto {a} {b}";
                }
                case "napauta" when o.Length >= 2: Napautus(Kohde(o[1])); return "tavli: " + vuoroRivi.text + " | valittu " + (valittu >= 0 ? Tavli.PisteenNimi(valittu) : "-");
                case "asema" when o.Length >= 2:
                {
                    // ui tavli asema <p0,…,p23|palkki0,palkki1|vuoro>: asema ilman heittoa; botin vuorolla botti heittää.
                    if (!Auki) Avaa();
                    PiilotaKortti();
                    kerta++; paattynyt = false; bottiMiettii = false; odottaa = false; valittu = -1; aloitusRivi = null;
                    peli = Tavli.Asemasta(o[1]);
                    lauta.Nopat.Piilota();
                    SeuraavaVuoro();
                    return "tavli: asema " + peli.Asema();
                }
                case "kumoa":
                    if (peli == null || !IhmisenVuoro || peli.TehdytAskeleet.Count == 0) return "tavli: ei kumottavaa";
                    peli.PeruAskel(); valittu = -1; AutoValinta(); Paivita();
                    return "tavli: kumottu | " + vuoroRivi.text;
                case "tulos" when o.Length >= 2: if (!Auki) Avaa(); peli ??= new Tavli(); Lopeta(int.Parse(o[1])); return "tavli: tulos " + o[1];
                case "kohtaaminen":
                {
                    var ohjain = PeliOhjain.Instanssi; var m = ohjain != null ? ohjain.Matka : null;
                    string id = o.Length > 1 ? o[1] : m?.Tila.Pelaaja.Sijainti.Kaupunki;
                    if (m == null || id == null || !m.Verkko.Kaupungit.TryGetValue(id, out var kaup)) return "tavli: ei kaupunkia " + id;
                    if (!(Peliluettelo.Kaupungille(kaup) is (PeliKuvaus pk, PeliMaa maa)) || pk.Id != Peliluettelo.Tavli.Id) return "tavli: ei tavlin kaupunki " + kaup.Id;
                    Kohtaaminen(pk, maa, kaup.Nimi);
                    return $"tavli: kohtaaminen {maa.MaanNimi} · {kaup.Nimi}";
                }
                case "lauta" when o.Length >= 2: ValitseLauta(int.Parse(o[1])); return "tavli: lauta " + Laudat[Lauta].Id + " | " + lautaHistoria.text;
                case "tila":
                    if (!Auki || peli == null) return "tavli: kiinni";
                    return $"tavli: {peli.Asema()} vuoro {peli.Vuorossa} heitto {(peli.Heitetty ? peli.Noppa1 + " " + peli.Noppa2 + " jäljellä " + string.Join(",", peli.Jaljella) : "-")}"
                        + $" pois {peli.Poistettu(0)}/{peli.Poistettu(1)} | {vuoroRivi.text} | {ohje.text}{(paattynyt ? " | päättyi" : "")}{(lauta.Nopat.Toimii ? "" : " | 2D-varalla")}";
                case "sulje": Sulje(); return "tavli: suljettu";
            }
            return "tavli: tuntematon (valinta | kohtaaminen [kaupunki] | peli <taso> | lauta <n> | heitto <a> <b> | napauta <0–23|palkki|pois|lauta> | asema <…> | kumoa | tulos <0|1|-2> | tila | sulje)";
        }
    }

    /// <summary>Tavlin mitat laudan kuvan pikseleinä (Linnanrakentajan tavli-mitat.json, 2048 × 1536, origo vasen yläkulma, y alas).</summary>
    public sealed class TavliMitat
    {
        public Vector2 Koko;
        public float Nappula;
        public readonly Vector2[] KantaA = new Vector2[24], KantaB = new Vector2[24], Karki = new Vector2[24];
        public readonly bool[] Ala = new bool[24];
        public Rect Palkki, PoistoYla, PoistoAla;
        public Vector2 NoppaOikea, NoppaVasen;
        public float NoppaSivu;

        static float F(object o) => (float)Convert.ToDouble(o, System.Globalization.CultureInfo.InvariantCulture);
        static Vector2 V(object o) { var l = MiniJson.Taulukko(o); return new Vector2(F(l[0]), F(l[1])); }
        static Rect R(object o) { var d = MiniJson.Objekti(o); var a = V(MiniJson.Kentta(d, "vasen_yla")); var b = V(MiniJson.Kentta(d, "oikea_ala")); return Rect.MinMaxRect(a.x, a.y, b.x, b.y); }

        public static TavliMitat Lue(string json)
        {
            var j = MiniJson.Objekti(MiniJson.Jasenna(json));
            var m = new TavliMitat { Koko = V(MiniJson.Kentta(j, "koko_px")), Nappula = F(MiniJson.Kentta(j, "nappula_halkaisija_px")) };
            var kolmiot = MiniJson.Taulukko(MiniJson.Kentta(j, "kolmiot"));
            if (kolmiot.Count != 24) throw new FormatException("24 kolmiota");
            foreach (var ko in kolmiot)
            {
                var k = MiniJson.Objekti(ko);
                int i = int.Parse(MiniJson.Teksti(k, "id").Substring(1));
                var kanta = MiniJson.Taulukko(MiniJson.Kentta(k, "kanta"));
                m.KantaA[i] = V(kanta[0]); m.KantaB[i] = V(kanta[1]);
                m.Karki[i] = V(MiniJson.Kentta(k, "karki"));
                m.Ala[i] = MiniJson.Totuus(k, "ala");
            }
            m.Palkki = R(MiniJson.Kentta(j, "palkki"));
            var p = MiniJson.Objekti(MiniJson.Kentta(j, "poistoalueet"));
            m.PoistoYla = R(MiniJson.Kentta(p, "yla")); m.PoistoAla = R(MiniJson.Kentta(p, "ala"));
            var n = MiniJson.Objekti(MiniJson.Kentta(j, "nopat"));
            m.NoppaOikea = V(MiniJson.Kentta(n, "oikea_keskus")); m.NoppaVasen = V(MiniJson.Kentta(n, "vasen_keskus"));
            m.NoppaSivu = F(MiniJson.Kentta(n, "noppa_sivu_px"));
            return m;
        }
    }

    /// <summary>Tavlin lauta: Linnanrakentajan kerrokset (lauta, nappulan varjo, vaalea, tumma; Resources/Pelit/Tavli), Myllyn renkaat
    /// (valittu, kohde), nappulat pinoina kolmioissa (halkaisija 0,92 × kanta; yli 5 limitetään), palkki ja poistolokerot; 3D-nopat
    /// lapsena (TavliNopat). Piirtojärjestys: lauta → noppien varjot → kohderenkaat → nappuloiden varjot → nappulat → valittu.</summary>
    public sealed class TavliLauta : VisualElement
    {
        public const string Kansio = "Pelit/Tavli/";
        readonly Action<int> napautettu;
        public TavliMitat Mitat { get; private set; }
        public readonly TavliNopat Nopat;
        Tavli peli;
        int valittu = -1;
        readonly List<int> kohteet = new List<int>();
        TavliAskel? anim; int animOmistaja; float animAlku = -1f;
        static float LiukuS => Tyylikirja.Kesto.Liuku / 1000f;
        float AnimT => anim.HasValue ? Mathf.Clamp01((Time.realtimeSinceStartup - animAlku) / LiukuS) : 1f;
        static float Pehmea(float t) => 1f - (1f - t) * (1f - t) * (1f - t);
        Texture2D kLauta, kVaalea, kTumma, kVarjo, rValittu, rKohde;
        string ladattu;
        /// <summary>Nappulakuvan kangas / nappulan halkaisija (160 / 113 px) ja renkaan kuva / halkaisija (Myllyn 320 / 200).</summary>
        const float NappulaKangas = 160f / 113f, RengasKangas = 320f / 200f;

        public string LautaId { get; private set; } = "kafeneio";

        public TavliLauta(Action<int> napautettu)
        {
            this.napautettu = napautettu;
            AddToClassList("mk-peli__lauta");
            generateVisualContent += Piirra;
            Nopat = new TavliNopat(this, MarkDirtyRepaint);
            RegisterCallback<PointerDownEvent>(e =>
            {
                if (Mitat == null) return;
                napautettu(Osuma(e.localPosition));
                e.StopPropagation();
            });
        }

        public void AsetaLauta(string id) { LautaId = id; if (ladattu != null) Lataa(); MarkDirtyRepaint(); }

        public void Lataa()
        {
            if (Mitat == null)
            {
                var j = Resources.Load<TextAsset>(Kansio + "tavli-mitat");
                if (j != null) { try { Mitat = TavliMitat.Lue(j.text); } catch (Exception e) { Debug.LogWarning("MATKAKIRJA tavli: mitat " + e.Message); } }
                else Debug.LogWarning("MATKAKIRJA tavli: tavli-mitat puuttuu");
            }
            if (Mitat != null) Nopat.Lataa(Mitat.NoppaOikea, Mitat.NoppaVasen, Mitat.NoppaSivu, Mitat.Koko);
            if (ladattu == LautaId && kLauta != null) return;
            ladattu = LautaId;
            // Laudat v2 (Linnanrakentaja 5.10., _valmiit/tavli-laudat/v2): kafeneio, tabula (bysantti/) ja tavla (ottomaani/); puuttuva → Kafeneio.
            kLauta = Kuva("lauta-" + LautaId) ?? Kuva("lauta-kafeneio");
            kVaalea = Kuva("nappula-vaalea-" + LautaId) ?? Kuva("nappula-vaalea-kafeneio");
            kTumma = Kuva("nappula-tumma-" + LautaId) ?? Kuva("nappula-tumma-kafeneio");
            kVarjo = Kuva("nappula-varjo-" + LautaId) ?? Kuva("nappula-varjo-kafeneio");
            rValittu = Resources.Load<Texture2D>(MyllyLauta.KansioPolku + "rengas-valittu");
            rKohde = Resources.Load<Texture2D>(MyllyLauta.KansioPolku + "rengas-kohde");
            if (kLauta == null || kVaalea == null || kTumma == null) Debug.LogWarning("MATKAKIRJA tavli: kerrokset puuttuvat (" + LautaId + ")");
            MarkDirtyRepaint();
        }

        public void Pura()
        {
            Nopat.Pura();
            kLauta = kVaalea = kTumma = kVarjo = rValittu = rKohde = null;
            ladattu = null;
        }

        static Texture2D Kuva(string nimi) => Resources.Load<Texture2D>(Kansio + nimi);

        public void Aseta(Tavli t, int valittu, List<int> kohteet)
        {
            peli = t; this.valittu = valittu;
            this.kohteet.Clear(); this.kohteet.AddRange(kohteet);
            MarkDirtyRepaint();
        }

        /// <summary>Askeleen animaatio (liuku ≤ 250 ms kuten Myllyssä); lyöty liukuu samalla palkille.</summary>
        public void Animoi(TavliAskel s, int omistaja)
        {
            anim = s; animOmistaja = omistaja; animAlku = Time.realtimeSinceStartup;
            float loppu = animAlku + LiukuS + 0.02f;
            schedule.Execute(MarkDirtyRepaint).Every(16).Until(() => { if (Time.realtimeSinceStartup <= loppu) return false; anim = null; MarkDirtyRepaint(); return true; });
        }

        // --- paikat (laudan kuvan pikseleinä) -------------------------------------------------------------------------

        float D => Mitat.Nappula;
        float Askel(float pituus, int n) => n <= 1 ? D : Mathf.Min(D, (pituus - D) / (n - 1));

        int Maara(int alue, int p) => alue == Tavli.Palkki ? peli.Palkilla(p) : alue == Tavli.Pois ? peli.Poistettu(p) : peli.Maara(alue);

        /// <summary>Nappulan k (0 = pohjin) keskus, kun alueella on n nappulaa: kolmio (kannalta kärkeä kohti), palkki (vaalea
        /// keskeltä ylös, tumma alas) tai poistolokero (vaalea alalokero alhaalta, tumma ylälokero ylhäältä).</summary>
        Vector2 Paikka(int alue, int p, int k, int n)
        {
            if (alue == Tavli.Palkki)
            {
                var r = Mitat.Palkki;
                float s = p == 0 ? -1f : 1f, alku = D * 0.6f;
                return new Vector2(r.center.x, r.center.y + s * (alku + k * Askel(r.height / 2f - alku + D / 2f, n)));
            }
            if (alue == Tavli.Pois)
            {
                var r = p == 0 ? Mitat.PoistoAla : Mitat.PoistoYla;
                float s = p == 0 ? -1f : 1f, alku = p == 0 ? r.yMax : r.yMin;
                return new Vector2(r.center.x, alku + s * (D / 2f + k * Askel(r.height, n)));
            }
            float bx = (Mitat.KantaA[alue].x + Mitat.KantaB[alue].x) / 2f, by = Mitat.KantaA[alue].y;
            float suunta = Mitat.Ala[alue] ? -1f : 1f, pituus = Mathf.Abs(Mitat.Karki[alue].y - by);
            return new Vector2(bx, by + suunta * (D / 2f + k * Askel(pituus, n)));
        }

        /// <summary>Napautuksen kohde: poistolokero, palkki, kolmio (koko sarake laudan puolikkaassa) tai −1 muualla.</summary>
        /// <summary>Viimeisimmän napautuksen x laudan pikseleinä (Lahin: lähin laillinen piste ± 1 saraketta).</summary>
        public float ViimeX { get; private set; }

        /// <summary>Sarakkeen keskikohta laudan pikseleinä.</summary>
        public float SarakeX(int piste) => (Mitat.KantaA[piste].x + Mitat.KantaB[piste].x) / 2f;

        int Osuma(Vector2 paikallinen)
        {
            float s = contentRect.width / Mitat.Koko.x;
            if (s <= 0) return -1;
            var q = paikallinen / s;
            ViimeX = q.x;
            if (Mitat.PoistoYla.Contains(q) || Mitat.PoistoAla.Contains(q)) return Tavli.Pois;
            if (Mitat.Palkki.Contains(q)) return Tavli.Palkki;
            float keski = Mitat.Koko.y / 2f;
            for (int i = 0; i < Tavli.Pisteita; i++)
            {
                if (q.x < Mitat.KantaA[i].x || q.x >= Mitat.KantaB[i].x) continue;
                if (Mitat.Ala[i] ? q.y >= keski : q.y < keski) return i;
            }
            return -1;
        }

        void Piirra(MeshGenerationContext mgc)
        {
            if (Mitat == null || contentRect.width < 10) return;
            float s = contentRect.width / Mitat.Koko.x;
            Rect Koko(Vector2 px, float koko) => new Rect((px.x - koko / 2f) * s, (px.y - koko / 2f) * s, koko * s, koko * s);
            var koko01 = new Rect(0f, 0f, 1f, 1f);
            MyllyLauta.Kuva(mgc, kLauta, new Rect(0f, 0f, contentRect.width, contentRect.height), koko01);
            foreach (var v in Nopat.Varjot()) MyllyLauta.Kuva(mgc, kVarjo, Koko(v.Px, v.Koko), koko01, v.A);
            if (peli == null) return;
            int oma = peli.Vuorossa;
            float nk = D * NappulaKangas, rk = D * RengasKangas;

            // Kohteet: seuraavan nappulan paikka (lyönnissä yksinäisen paikka, poistossa lokeron seuraava paikka).
            foreach (int k in kohteet)
            {
                int n = Maara(k, oma);
                bool lyonti = k < Tavli.Pisteita && peli.Omistaja(k) == 1 - oma;
                MyllyLauta.Kuva(mgc, rKohde, Koko(lyonti ? Paikka(k, oma, 0, 1) : Paikka(k, oma, n, n + 1), rk), koko01);
            }

            // Nappulat; animoitava (siirtyvä ja lyöty) piirretään liukuvana omasta lopputilastaan taaksepäin laskien.
            float tl = Pehmea(AnimT);
            var nappulat = new List<(Vector2 P, int O)>(32);
            bool animoi = anim.HasValue && tl < 1f;
            var am = anim.GetValueOrDefault();
            int lyoty = 1 - animOmistaja;
            void Alue(int alue, int p, int n)
            {
                for (int k = 0; k < n; k++)
                {
                    if (animoi && alue == am.Mihin && p == animOmistaja && k == n - 1) continue;
                    if (animoi && am.Lyonti && alue == Tavli.Palkki && p == lyoty && k == n - 1) continue;
                    nappulat.Add((Paikka(alue, p, k, n), p));
                }
            }
            for (int i = 0; i < Tavli.Pisteita; i++) if (peli.Maara(i) > 0) Alue(i, peli.Omistaja(i), peli.Maara(i));
            for (int p = 0; p < 2; p++) { Alue(Tavli.Palkki, p, peli.Palkilla(p)); Alue(Tavli.Pois, p, peli.Poistettu(p)); }
            if (animoi)
            {
                int nMista = Maara(am.Mista, animOmistaja), nMihin = Maara(am.Mihin, animOmistaja);
                var lahto = Paikka(am.Mista, animOmistaja, nMista, nMista + 1);
                var kohde = Paikka(am.Mihin, animOmistaja, nMihin - 1, nMihin);
                if (am.Lyonti)
                {
                    int nb = peli.Palkilla(lyoty);
                    nappulat.Add((Vector2.Lerp(Paikka(am.Mihin, lyoty, 0, 1), Paikka(Tavli.Palkki, lyoty, nb - 1, nb), tl), lyoty));
                }
                nappulat.Add((Vector2.Lerp(lahto, kohde, tl), animOmistaja));
            }
            foreach (var n in nappulat) MyllyLauta.Kuva(mgc, kVarjo, Koko(n.P, nk), koko01);
            foreach (var n in nappulat) MyllyLauta.Kuva(mgc, n.O == 0 ? kVaalea : kTumma, Koko(n.P, nk), koko01);
            if (valittu >= 0)
            {
                int n = Maara(valittu, oma);
                if (n > 0) MyllyLauta.Kuva(mgc, rValittu, Koko(Paikka(valittu, oma, n - 1, n), rk), koko01);
            }
        }
    }
}
