// IHMISEN MATKA -LINSSI (web js/linssit/ihmisen-matka.js + ihmisen-matka-esitys.js).
//
// Avaus: pelin kerrokset piiloon ja musiikki pitoon; värivirrat ja vanat
// lasketaan (sovitin ajaa laskennan taustasäikeessä ja antaa valmiin tuloksen
// Vanat-ominaisuuteen), ja esitys alkaa, kun laskenta on valmis — webissä
// Käynnistä-nappi odottaa samoin (odotaVirtoja). Sulkiessa kamera palaa.
//
// MUISTI (web aikajana.js tallennaMuisti/lueLinssimuisti/jatkaMuistista): jos edellinen sulku
// jätti muistin, esitys tai tutkimusvaihe jatkuu siitä ilman avausta ja esittelylaatikkoa
// (JatkuuMuistista), kun vanat ovat valmiit. Esityksen loppu aloittaa tutkimusvaiheen.
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Virrat;

namespace Matkakirja.Linssit.Aikajana
{
    public sealed class IhmisenMatkaLinssi : ILinssi, ITiedeliitteenLahde
    {
        public static readonly LinssiTiedot IhmisenMatkaTiedot = new LinssiTiedot
        {
            Id = "ihmisen-matka",
            Nimi = "Ihmisen matka",
            Lyhyt = "Ihmisen matka Afrikasta koko maapallolle: kello juoksee, valot syttyvät.",
            Jarjestys = 26,
        };

        readonly IhmisenMatkaAineisto aineisto;
        readonly IReadOnlyDictionary<string, JaksonLeimat> leimat;
        readonly IEsityksenNakyma nakyma;
        readonly IEsityksenAani aani;
        ILinssiYmparisto y;
        Nakyma talteen;
        List<IReadOnlyList<double[]>> vanat = new List<IReadOnlyList<double[]>>();
        IReadOnlyList<Vana> vanaLista = Array.Empty<Vana>();
        IReadOnlyList<Virta> virrat = Array.Empty<Virta>();
        LinssiMuistiTila muisti;
        bool muistiLukittu;

        /// <summary>Laitteen varasto muistille (Unityssä PlayerPrefs); null = ei muistia.</summary>
        public ILinssiVarasto Varasto;
        /// <summary>Tutkimusvaiheen näkymä (Natiivi-UI:n napit, lappu ja pisteet); null = ei vaihetta.</summary>
        public ITutkimuksenNakyma TutkimuksenNakyma;
        /// <summary>Tutkimusvaihe esityksen jälkeen (null ennen loppua).</summary>
        public Tutkimusvaihe Tutkimus { get; private set; }
        /// <summary>
        /// Avaus jatkaa muistista (web lueLinssimuisti): esittelylaatikkoa ei näytetä, vaan esitys
        /// tai tutkimusvaihe jatkuu itse, kun vanat ovat valmiit.
        /// </summary>
        public bool JatkuuMuistista => muisti != null;
        /// <summary>Värivirrat palkin legendaan ja nappeihin (Natiivi-UI, web rakennaKertomuksenPalkki).</summary>
        public IReadOnlyList<Virta> Virrat => virrat;
        /// <summary>Tutkimusvaihe alkoi (Natiivi-UI kytkee kortin avauksen ja napit).</summary>
        public event Action<Tutkimusvaihe> TutkimusAlkoi;

        public Esitys Esitys { get; private set; }
        public LinssiTiedot Tiedot { get; }
        public bool Auki { get; private set; }
        /// <summary>Käynnistyykö esitys itse, kun vanat ovat valmiit (ilman UI:n esittelylaatikkoa).</summary>
        public bool Itsestaan = true;

        public IhmisenMatkaLinssi(IhmisenMatkaAineisto aineisto, IReadOnlyDictionary<string, JaksonLeimat> leimat,
            IEsityksenNakyma nakyma, IEsityksenAani aani, LinssiTiedot tiedot = null)
        {
            this.aineisto = aineisto;
            this.leimat = leimat;
            this.nakyma = nakyma;
            this.aani = aani;
            Tiedot = tiedot ?? IhmisenMatkaTiedot;
        }

        /// <summary>
        /// Värivirrat ja vanat aineistosta (puhdas laskenta, ~130 ms Macilla): sovitin
        /// kutsuu tämän taustasäikeessä ja antaa tuloksen Vanat-kutsulla.
        /// </summary>
        public static VanatTulos Laske(VirtaAineisto virrat)
        {
            var maa = Ruudukko.PuraMaamaski(virrat.Maamaski.Juoksut);
            var kentat = VirtaLaskenta.LaskeKentat(virrat, maa);
            return Vanat.JohdaVanat(kentat, virrat.Vanat, maa, pysakit: virrat.Pysakit);
        }

        /// <summary>Lasketut vanat (selkäranka ensin) esityksen kamerarajausta varten.</summary>
        public void AsetaVanat(VanatTulos tulos, IReadOnlyList<Virta> virrat = null)
        {
            vanaLista = tulos.Vanat;
            pilkut = null;
            if (virrat != null) this.virrat = virrat;
            vanat = tulos.Vanat.Select(v => (IReadOnlyList<double[]>)v.Pisteet.Select(p => new[] { p.Lat, p.Lon, p.Aika }).ToList()).ToList();
            if (Auki && Esitys != null && !Esitys.Kaynnissa && !Esitys.Paattynyt && Esitys.I < 0)
            {
                if (muisti != null) Jatka();
                else if (Itsestaan) Esitys.Aloita();
            }
        }

        public bool VanatValmiit => vanat.Count > 0;

        public void Avaa(ILinssiYmparisto ymparisto)
        {
            if (Auki) return;
            y = ymparisto;
            Auki = true;
            talteen = y.Kamera;
            y.Pelikerrokset(false);
            y.MusiikkiPitoon(true);
            muistiLukittu = false;
            muisti = LueMuisti();
            Esitys = UusiEsitys();
            if (!VanatValmiit) return;
            if (muisti != null) Jatka();
            else if (Itsestaan) Esitys.Aloita();
        }

        Esitys UusiEsitys()
        {
            var e = new Esitys(aineisto.Kertomus, aineisto.Kohteet, leimat, () => vanat, y, nakyma, aani) { MusiikkiLaji = MusiikkiLaji };
            e.Tallenna = () => TallennaMuisti();
            e.Lopussa = AloitaTutkimus;
            return e;
        }

        /// <summary>Web jatkaMuistista: kamera muistin paikkaan ilman liikettä, esitys siitä mihin jäätiin.</summary>
        void Jatka()
        {
            var m = muisti;
            if (m.Kamera is Nakyma k) y.AjaKamera(k, 0);
            if (!Esitys.JatkaMuistista(m))
            {
                muisti = null;
                if (Itsestaan) Esitys.Aloita();
            }
        }

        /// <summary>Esitys päättyi (web ui.aloitaTutkimusvaihe).</summary>
        void AloitaTutkimus()
        {
            if (!Auki || Tutkimus != null) return;
            Tutkimus = new Tutkimusvaihe(aineisto, vanaLista, virrat, y, TutkimuksenNakyma, () => TallennaMuisti());
            var m = muisti;
            muisti = null;
            Tutkimus.Aloita(m);
            TutkimusAlkoi?.Invoke(Tutkimus);
            TallennaMuisti();
        }

        /// <summary>Web lueLinssimuisti: tunnetut jaksot, nostot ja virrat.</summary>
        LinssiMuistiTila LueMuisti()
        {
            if (Varasto == null || aineisto.Kertomus.Count == 0) return null;
            var nostot = aineisto.Paikat.Concat(aineisto.Lisanostot).Select(p => p.Tunnus).Where(t => t != null).ToList();
            return LinssiMuisti.Lue(Varasto, Tiedot.Id, aineisto.Kertomus.Select(j => j.Id).ToList(), nostot,
                virrat.Count > 0 ? virrat.Select(v => v.Tunnus).ToList() : null);
        }

        /// <summary>
        /// Web tallennaMuisti: vasta kun esitys on käynnistetty, ei mustassa alussa (avaus kesken ei
        /// ole muistettava paikka), eikä lukon aikana (purku ja Aloita alusta).
        /// </summary>
        public bool TallennaMuisti()
        {
            if (Varasto == null || muistiLukittu || Esitys == null || aineisto.Kertomus.Count == 0) return false;
            if (Esitys.I < 0 && !Esitys.Paattynyt) return false;
            if (Esitys.MustaPaalla && !Esitys.Paattynyt) return false;
            var jakso = Esitys.I >= 0 && Esitys.I < aineisto.Kertomus.Count ? aineisto.Kertomus[Esitys.I].Id : null;
            var k = y.Kamera;
            return LinssiMuisti.Tallenna(Varasto, Tiedot.Id, new LinssiMuistiTila
            {
                Vaihe = Esitys.Paattynyt || Tutkimus != null ? "tutkimus" : "esitys",
                Jakso = jakso,
                Kulunut = Esitys.Kulunut,
                PitoMin = double.IsFinite(Esitys.PitoMin) ? Math.Round(Esitys.PitoMin) : (double?)null,
                Kamera = double.IsFinite(k.Lat) && k.Korkeus > 0 ? new Nakyma(k.Lat, k.Lon, k.Korkeus) : (Nakyma?)null,
                Kortti = Tutkimus?.Kortti,
                Virta = Tutkimus?.Valittu,
            });
        }

        /// <summary>Kaaren oma raita (web ihmisen-matka.js aikajana.musiikki).</summary>
        public const string MusiikkiLaji = "ihmisen-matka";

        /// <summary>Esittelylaatikon Käynnistä-nappi (odottaa vanoja kuten web).</summary>
        public bool Kaynnista()
        {
            if (!VanatValmiit || Esitys == null) return false;
            Esitys.Aloita();
            return true;
        }

        /// <summary>
        /// Valikon "Aloita alusta" (web aikajana.js aloitaAlusta kertomuskaarella: muisti pois ja
        /// ajo uudestaan samalla linssillä). Esitys ja tutkimusvaihe puretaan ja aloitetaan alusta;
        /// kamera palaa linssin sulkiessa yhä sinne, mistä linssi alun perin avattiin.
        /// </summary>
        public bool AloitaAlusta()
        {
            if (!Auki) return false;
            muistiLukittu = true;
            LinssiMuisti.Tyhjenna(Varasto, Tiedot.Id);
            muisti = null;
            Tutkimus?.Pura();
            Tutkimus = null;
            Esitys?.Pura();
            Esitys = UusiEsitys();
            muistiLukittu = false;
            if (VanatValmiit && Itsestaan) Esitys.Aloita();
            return true;
        }

        /// <summary>
        /// Aikaselaimen pisteet (web rakennaAikaselain): kaanonin jaksot järjestyksessä, otsikkona
        /// jakson kohteen nimi (tai alue tai tunnus) ja vuosia. Nauha on Natiivi-UI:n; veto kutsuu
        /// Esitys.Esikatsele(osuus), irrotus Esitys.Valitse(id), vuositeksti Esitys.SelaimenVuositeksti.
        /// </summary>
        public IReadOnlyList<(string Id, string Otsikko, double Vuosia)> AikaselaimenPisteet()
        {
            var nimet = aineisto.Paikat.Concat(aineisto.Lisanostot).Where(p => p.Tunnus != null)
                .GroupBy(p => p.Tunnus).ToDictionary(g => g.Key, g => g.First().Otsikko);
            return aineisto.Kertomus.Select(j => (j.Id,
                (j.Kohde != null && nimet.TryGetValue(j.Kohde, out var n) ? n : null) ?? j.Alue ?? j.Id,
                j.Vuosia ?? 0)).ToList();
        }

        List<Pysakki> tiedeliite;
        IReadOnlyList<Pysakki> TiedeliitteenPysakit => tiedeliite ??= aineisto.TiedeliitteenPysakit();

        /// <summary>
        /// Kortin "Lue lisää" (web ajo.avaaNostonJuttu(indeksi)): tiedeliitteen sivu löytöpaikan
        /// indeksillä; null, jos sivua ei ole (lisänosto tai ei juttua). Natiivi-UI:n Tiedeliitenäkymä.
        /// </summary>
        public TiedeliiteSivu Tiedeliite(int i) => Aikajana.Tiedeliite.Sivu(TiedeliitteenPysakit, i);

        /// <summary>Noston tiedeliitesivun indeksi (löytöpaikan järjestysnumero) tai -1.</summary>
        public int TiedeliitteenSivu(string tunnus)
        {
            int i = aineisto.Paikat.FindIndex(p => p.Tunnus == tunnus);
            return i >= 0 && Aikajana.Tiedeliite.OnSivu(TiedeliitteenPysakit[i]) ? i : -1;
        }

        /// <summary>
        /// Sisällys LISTANA (web sisallys { lista, ajoitus: lyhytAjoitus, pilkku }): aikajärjestyksessä
        /// indeksi, lyhyt ajoitus ("230 000 v."), otsikko ja tunnus (pilkun väri tunnuksesta).
        /// </summary>
        public IReadOnlyList<(int I, string Ajoitus, string Otsikko, string Tunnus)> TiedeliitteenSisallys() =>
            aineisto.Paikat.Select((p, i) => (p, i)).Where(x => Aikajana.Tiedeliite.OnSivu(TiedeliitteenPysakit[x.i]))
                .Select(x => (x.i, x.p.LyhytAjoitus, x.p.Otsikko, x.p.Tunnus)).ToList();

        /// <summary>Alkusanat tiedeliitteen ensimmäisen sivun kärkeen (web tiedeliiteAlkusanat); null = ei.</summary>
        public string TiedeliitteenAlkusanat => aineisto.Kaistaselite;

        // ── Tiedeliite (web avaaNostonJuttu, vaimennaJutunAjaksi, palautaJutunJalkeen) ──

        /// <summary>Kortin "Lue lisää" pyysi sivun auki: UI avaa Tiedeliitenäkymän.</summary>
        public event Action<int> JuttuPyydetty;
        /// <summary>Auki oleva sivu (löytöpaikan indeksi) tai -1.</summary>
        public int JuttuAuki { get; private set; } = -1;

        /// <summary>Kortin "Lue lisää" (web ajo.avaaNostonJuttu(indeksi)): raita väistyy sivun ajaksi.</summary>
        public bool AvaaJuttu(int i)
        {
            if (!Auki || Tiedeliite(i) == null) return false;
            if (JuttuAuki < 0) Esitys?.JutunAjaksi(true);
            JuttuAuki = i;
            JuttuPyydetty?.Invoke(i);
            return true;
        }

        public void JuttuVaihtui(int j) { if (JuttuAuki >= 0) JuttuAuki = j; }

        /// <summary>Sivu suljettiin (web palautaJutunJalkeen): raita palaa esityksen tasolle.</summary>
        public void JuttuSuljettu()
        {
            if (JuttuAuki < 0) return;
            JuttuAuki = -1;
            Esitys?.JutunAjaksi(false);
        }

        /// <summary>Sisällys keksintöjen muodossa (vuosi = lyhyt ajoitus, ei henkilöä).</summary>
        public IReadOnlyList<(int I, string Vuosi, string Otsikko, string Henkilo)> Sisallys() =>
            TiedeliitteenSisallys().Select(r => (r.I, r.Ajoitus, r.Otsikko, (string)null)).ToList();

        public bool SisallysListana => true;

        Dictionary<string, string> pilkut;

        /// <summary>Web pilkku: noston vanan väri (kortin vari); null, ennen kuin vanat ovat valmiit.</summary>
        public string SisallyksenPilkku(int i)
        {
            if (i < 0 || i >= aineisto.Paikat.Count || vanaLista.Count == 0) return null;
            pilkut ??= Tutkimusvaihe.KokoaNostot(aineisto, vanaLista, virrat).Where(n => n.Tunnus != null)
                .GroupBy(n => n.Tunnus).ToDictionary(g => g.Key, g => g.First().Vari);
            return pilkut.TryGetValue(aineisto.Paikat[i].Tunnus ?? "", out var v) ? v : null;
        }

        public void Paivita() => Esitys?.Paivita();

        public void Sulje()
        {
            if (!Auki) return;
            JuttuAuki = -1;
            // Muisti talteen ennen purkua ja lukkoon: kortin ja tutkimusvaiheen purku kirjoittaisi
            // muuten "ei avointa korttia" juuri tallennetun tilan päälle (web pura).
            TallennaMuisti();
            muistiLukittu = true;
            Auki = false;
            muisti = null;
            Tutkimus?.Pura();
            Tutkimus = null;
            Esitys?.Pura();
            Esitys = null;
            y.Pelikerrokset(true);
            y.MusiikkiPitoon(false);
            y.AjaKamera(talteen, y.VahennettyLiike ? 0f : 0.9f);
        }
    }
}
