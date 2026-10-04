// DIORAAMAN ÄÄNET (Poikkileikkaus-linssi, Linnanrakentaja erä 2, 29.9.2026): dioraaman omat äänisilmukat
// (Tila.Aanet + "massa"-yleisnäkymämalli, ISilmukka-pooli ILinssiYmparisto.Silmukka:sta), tilan satunnaiset
// kertaäänitehosteet (Tila.Tehosteet) ja käsikirjoituksen puheäänet (repliikit, reaktiot, taulun kohdat)
// kertaluonteisina URL:sta (EsityksenAani-malli: UnityWebRequestMultimedia, compressed=true, ei striimausta —
// klipit ovat lyhyitä). Tavoitetasot ja tehosteajastin tulevat Ytimestä (Matkakirja.Linssit.Dioraama.
// Aanimaisema); tämä tiedosto omistaa Unity-puolen kahvat, AudioSourcen ja verkkolataukset. Katso
// dioraama-aanirajapinta-ehdotus.md ja dioraama-rajapinnat-era2-20260929.md kohta 3 "Äänet".
//
// KYTKIMET: Tehosteet ja silmukat noudattavat Kytkin.Aanimaisema (kuten LinssiTehosteet.Soita ja
// IhmisenMatka2Maisema), puheäänet (repliikki/reaktio/kohta) Kytkin.Kertoja (kuten LinssiUi.cs:n
// EsityksenAani.Mykistetty) — molemmat luetaan suoraan Asetukset.Paalla:lla, samasta paikasta kuin muu
// linssikoodi, eikä mitään jaettua tiedostoa muuteta tätä varten.
//
// ELINKAARI: DioraamaSovitin omistaa tämän PYSYVÄNÄ kenttänä (kuten ladatutPinnat/ladatutLiekkiAtlakset) —
// klippivälimuisti säilyy linssin sulkemisen ja uudelleenavaamisen yli, jottei samoja repliikkejä ladata
// verkosta uudestaan joka avauksella. VAIN istuntokohtainen tila (silmukkakahvat, puhuja-lippu, käynnissä
// olevan askeleen tunniste, Ytimen Aanimaisema-instanssi) nollataan Avaa/Sulje-parissa, ks. Avaa ja Sulje.
using System;
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Linssit;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;
using UnityEngine.Networking;
// "Nakyma" on kahdessa nimiavaruudessa (Matkakirja.Linssit.Nakyma = pallon lat/lon-asento,
// Matkakirja.Linssit.Dioraama.Nakyma = dioraaman NakymaHetkella-tulos): alias poistaa CS0104-ristiriidan,
// samaan tapaan kuin DioraamaSovitin.cs:n DioraamaNakyma-alias.
using Nakyma = Matkakirja.Linssit.Dioraama.Nakyma;

namespace Matkakirja.Natiivi
{
    public sealed class DioraamaAanet
    {
        readonly LinssiOhjain o;
        readonly DioraamaSovitin sovitin;

        Aanimaisema aanimaisema = new Aanimaisema();
        ILinssiYmparisto y;
        Rakennus rakennus;
        AudioSource kertaAaniLahde;
        /// <summary>Puheväylän taso −3 dB (Päätoimittaja 30.9.: puhetiedostot −0,2 dBTP, silmukoiden päällä pelivaraa);
        /// masterissa lisäksi DioraamaLimitteri (−1 dBFS).</summary>
        public const float PuheTaso = 0.708f;

        // --- MIKSERIKOUKUT (Pelikoodarin AaniMikseri, omistajan kehittäjämikseri 30.9.2026) ------------------------------------
        // AaniMikseri omistaa säätöjen tilan ja tallennuksen ja kirjoittaa kertoimet näihin; tämä luokka vain soittaa.
        /// <summary>Mikseritila: repliikeistä soi kuiva + kaiku tahdistettuna (jos pankissa on raidat), muuten Tiedosto.</summary>
        public static bool MikseriTila;
        /// <summary>Kertoimet 0…2 (puuttuva = 1): huone (tila-id; yleisnäkymä ""), tausta (ääni-id).</summary>
        public static readonly Dictionary<string, float> HuoneKerroin = new Dictionary<string, float>(), TaustaKerroin = new Dictionary<string, float>();
        /// <summary>Taustojen väistö puheen alla (tila → 0…1, puuttuva = 1 = nykyinen 0,15-taso) ja kaiun taso (tila → 0…1).</summary>
        public static readonly Dictionary<string, float> VaistoKerroin = new Dictionary<string, float>(), KaikuKerroin = new Dictionary<string, float>();
        /// <summary>A/B: kaiku pois (ohittaa KaikuKerroimen). Kaiun pituus "lyhyt" (Kaiku) | "pitka" (KaikuPitka).</summary>
        public static bool KaikuPois;
        public static string KaikunPituus = "lyhyt";
        /// <summary>Kohdistettu huone (null = yleisnäkymä) ja sen vaihtuminen.</summary>
        public static string NykyinenHuone { get; private set; }
        public static event Action<string> HuoneVaihtui;
        /// <summary>Nyt soivat taustat (tila, ääni-id, taso väistön jälkeen); enintään 6.</summary>
        public static IReadOnlyList<(string Tila, string AaniId, float Taso)> SoivatTaustat => soivatTaustat;
        static readonly List<(string Tila, string AaniId, float Taso)> soivatTaustat = new List<(string, string, float)>();
        static DioraamaAanet aktiivinen;
        // ÄÄNIRYHMÄT (Siirtoseppä 5.10.2026, omistajan TF 141 -palaute: "Äänisäätimiä ei ole kaikille äänille. Nyt kuuluu askelia ja
        // kuorolaulua yms. alku esittelyn aikana mikä menee puheen päälle"): jokainen linnan ääni kuuluu yhteen ryhmään, jolla on
        // mikserin säädin (RyhmaKerroin, avain "ryhma:<id>"), ja KAIKKI ryhmät väistävät puhetta samalla kertoimella. Kertaäänet
        // soivat ryhmänsä omasta lähteestä, jonka volume liukuu joka kehys: myös jo soiva 40 s:n laulu väistää kesken soiton.
        public static readonly string[] Ryhmat = { "askeleet", "kuoro", "tehosteet", "liekit", "taustat" };
        public static readonly Dictionary<string, float> RyhmaKerroin = new Dictionary<string, float>();
        /// <summary>Ääni-id:n ryhmä nimen perusteella (pankissa ei ole ryhmäkenttää).</summary>
        public static string Ryhma(string aaniId, bool silmukka)
        {
            if (string.IsNullOrEmpty(aaniId)) return "tehosteet";
            if (aaniId.EndsWith("-ratina", StringComparison.Ordinal)) return "liekit";
            if (silmukka) return "taustat";
            if (aaniId.StartsWith("askel", StringComparison.Ordinal)) return "askeleet";
            if (aaniId.StartsWith("laulu", StringComparison.Ordinal) || aaniId.StartsWith("kello", StringComparison.Ordinal)) return "kuoro";
            return "tehosteet";
        }
        readonly Dictionary<string, AudioSource> kertaLahteet = new Dictionary<string, AudioSource>();
        readonly Dictionary<(string, string), double> edellinenTaso = new Dictionary<(string, string), double>();
        float viimeDuck = 1f;
        static float Kerroin(Dictionary<string, float> d, string avain, float oletus = 1f) =>
            avain != null && d.TryGetValue(avain, out var v) ? v : oletus;
        AudioSource puheKuiva, puheKaiku;
        float puheLoppuu = -1f; // kuunnelman rivi väistää taustoja tähän asti (unscaled)

        /// <summary>Tilan silmukat: avain (tilaId, aaniId) — kuten Tila.Aanet-lista, jokainen käyttö oma kahva,
        /// vaikka eri tilat sattuisivat viittaamaan samaan äänitiedostoon (ks. tiedoston alkukommentti).</summary>
        readonly Dictionary<(string Tila, string Aani), ISilmukka> silmukat = new Dictionary<(string, string), ISilmukka>();
        /// <summary>KUOLLUT SILMUKKAKAHVA -korjaus (löydös, katselmointi 29.9.2026): hetki (Paivita-kutsun t), jolloin
        /// tämän parin tavoitetaso ensin putosi ≤0,01:een kahvan ollessa auki. Kun t - tämä ≥ 1,5 s, kahva Lopetetaan
        /// ja poistetaan silmukat-sanakirjasta (pooli vapautuu; seuraava tarve avaa uuden kahvan). Ei sisällä avaimia
        /// joiden kahva ei ole auki tai joiden tavoitetaso on tälläkin hetkellä > 0,01.</summary>
        readonly HashSet<string> aaniNahty = new HashSet<string>();
        readonly Dictionary<(string Tila, string Aani), double> hiljaisuusAlkoi = new Dictionary<(string, string), double>();
        /// <summary>Paivita-kutsun uudelleenkäyttämät puskurit (ei uutta listaa/joukkoa joka ruutu): ehdokkaat =
        /// kaikki tila+ääni-parit tavoitetasoineen tältä ruudulta, sallitut = niistä valitut (kynnys+top 6).</summary>
        readonly List<(string Tila, string Aani, double Taso)> ehdokkaat = new List<(string, string, double)>();
        readonly HashSet<(string, string)> sallitut = new HashSet<(string, string)>();
        /// <summary>Kertaääniklipit URL:n mukaan; säilyy sulkemisen yli (ks. luokan alkukommentti).</summary>
        readonly Dictionary<string, AudioClip> klipit = new Dictionary<string, AudioClip>(StringComparer.Ordinal);
        readonly HashSet<string> klipitJonossa = new HashSet<string>(StringComparer.Ordinal);

        string viimeAskelAvain;
        bool puhuu;
        /// <summary>"poikki aanet 0|1" -kehityskytkin (A/B): kaikki tämän tiedoston äänet pois, kun false.</summary>
        public bool Paalla = true;

        public DioraamaAanet(LinssiOhjain o, DioraamaSovitin sovitin)
        {
            this.o = o;
            this.sovitin = sovitin;
        }

        /// <summary>Linssi avautuu: tuore Ydin-tila (ei vanhaa liukua/ajastinta edelliseltä istunnolta), kertaäänen
        /// lähde luodaan kerran (pysyy seuraavillekin avauksille, kuten nayttamo-oliot yleensä eivät — tämä on
        /// kevyt AudioSource, ei tarvitse tuhota välissä).</summary>
        public void Avaa(ILinssiYmparisto ymparisto, Rakennus rak, Transform juuri)
        {
            y = ymparisto;
            rakennus = rak;
            AaniMikseri.LinnaTila(true); // mikseritila ennen esilatausta (Pelikoodarin AaniMikseri)
            aanimaisema = new Aanimaisema();
            silmukat.Clear();
            hiljaisuusAlkoi.Clear();
            viimeAskelAvain = null;
            puhuu = false;
            if (kertaAaniLahde == null)
            {
                var go = new GameObject("DioraamaKertaaanet");
                go.transform.SetParent(juuri, false);
                kertaAaniLahde = go.AddComponent<AudioSource>();
                kertaAaniLahde.playOnAwake = false;
                kertaAaniLahde.spatialBlend = 0;
                foreach (var ryhma in Ryhmat)
                {
                    var l = go.AddComponent<AudioSource>();
                    l.playOnAwake = false; l.spatialBlend = 0;
                    kertaLahteet[ryhma] = l;
                }
                puheKuiva = go.AddComponent<AudioSource>(); puheKuiva.playOnAwake = false; puheKuiva.spatialBlend = 0;
                puheKaiku = go.AddComponent<AudioSource>(); puheKaiku.playOnAwake = false; puheKaiku.spatialBlend = 0;
            }
            aktiivinen = this;
            // Kuunnelman tekstityksen äänikoukut (Natiivi-UI:n KuunnelmaKaistale): sama puheväylä, kaiku ja kertoimet.
            KuunnelmaKaistale.Soita = id => aktiivinen?.SoitaPuhe(id, false); // kuunnelman rivit etenevät itsestään
            // YKSI PUHE KERRALLAAN (omistaja 2.10. TF 120): linnan puhe näkyy Aanet.KertojaPuhuu-tilana (Pulu ei aloita
            // päälle), kertojakanavan ja Puhe-luennan alku katkaisee sen, ja linnan uusi puhe katkaisee muut.
            Aanet.LinssiPuhuu = () => aktiivinen != null && aktiivinen.PuheSoi;
            Aanet.LinssiPuheKatkaise = () => aktiivinen?.KatkaisePuhe();
            if (Puhe.Instanssi != null) { Puhe.Instanssi.Puhuu -= PuheLuentaAlkoi; Puhe.Instanssi.Puhuu += PuheLuentaAlkoi; }
            KuunnelmaKaistale.AanenKesto = id => aktiivinen?.PuheenKesto(id);
            DioraamaLimitteri.Paalle(true);
            if (rakennus?.Taulu?.Kohdat != null)
                foreach (var k in rakennus.Taulu.Kohdat) VarmistaLadattuAaniId(k.Aani);
            EsilataaKertoja();
            viimeJakso = -1;
        }

        /// <summary>Kertojan jaksojen ja rakennuksen Pulun puheäänet ladataan heti (kierros alkaa saapumisen jälkeen).</summary>
        void EsilataaKertoja()
        {
            if (rakennus == null) return;
            foreach (var j in rakennus.Kertoja) VarmistaLadattuAaniId(j.Aani);
            VarmistaLadattuAaniId(rakennus.PuluAani);
        }

        /// <summary>Rakennus.json valmistui vasta linssin ollessa auki (DioraamaSovitin.LataaRakennus): sama
        /// esilataus kuin Avaa-metodin lopussa, koska rakennus oli silloin vielä null.</summary>
        public void RakennusValmis(Rakennus rak)
        {
            rakennus = rak;
            if (rakennus?.Taulu?.Kohdat != null)
                foreach (var k in rakennus.Taulu.Kohdat) VarmistaLadattuAaniId(k.Aani);
            EsilataaKertoja();
        }

        /// <summary>Yhden tilan data valmistui (DioraamaSovitin.TaydennaLataamattomat, sama hetki kuin glb/atlas-
        /// lataukset alkavat): esilataa TÄMÄN tilan tehosteet ja puheäänet (repliikit, reaktio, taulun kohdat),
        /// jottei ensimmäinen laukaisu jää soittamatta latauksen kesken ollessa (ks. SoitaKertaAani).</summary>
        public void TilaValmis(Tila tila)
        {
            if (tila == null) return;
            foreach (var jakso in tila.Tehosteet)
                foreach (var id in jakso.AaniIdt) VarmistaLadattuAaniId(id);
            foreach (var h in tila.Hahmot)
            {
                foreach (var r in h.Repliikit) VarmistaLadattuAaniId(r.Aani);
                if (h.Reaktio != null) VarmistaLadattuAaniId(h.Reaktio.Aani);
            }
            if (tila.Taulu?.Kohdat != null) foreach (var k in tila.Taulu.Kohdat) VarmistaLadattuAaniId(k.Aani);
            foreach (var rivi in tila.Kuunnelma) VarmistaLadattuAaniId(rivi.Aani);
            VarmistaLadattuAaniId(tila.PuluAani);
        }

        void VarmistaLadattuAaniId(string aaniId)
        {
            if (string.IsNullOrEmpty(aaniId) || rakennus == null || !rakennus.Aanet.TryGetValue(aaniId, out var aani)) return;
            VarmistaLadattu(sovitin.AaniUrl(aani.Tiedosto));
            // Mikseriraidat vain mikseritilassa (kehittäjä; ei turhaa latausta pelaajille).
            if (MikseriTila)
                foreach (var p in new[] { aani.Kuiva, aani.Kaiku, aani.KaikuPitka })
                    if (!string.IsNullOrEmpty(p)) VarmistaLadattu(sovitin.AaniUrl(p));
        }

        /// <summary>Joka kehys (DioraamaSovitin.Paivita): tilan silmukoiden tasot, tehosteajastimet ja käsikirjoituksen
        /// puheaskeleen vaihto. t on SAMA hetki kuin nakyma laskettiin (pysäytettyT tai y.Aika) — kun se on jäädytetty
        /// ("poikki aika"), nakyma pysyy samana kehyksestä toiseen, joten mikään tässä metodissa ei havaitse reunaa
        /// eikä laukea uudelleen: ei tarvita erillistä pysäytys-lippua (ks. Aanimaisema.cs:n TehosteAjastin-kommentti).</summary>
        public void Paivita(Rakennus rak, Nakyma nakyma, double t)
        {
            rakennus = rak;
            SeuraaMuutaPuhetta();
            bool aanimaisemaPaalla = Paalla && Asetukset.Paalla(Kytkin.Aanimaisema);
            bool kertojaPaalla = Paalla && Asetukset.Paalla(Kytkin.Kertoja);

            // KUOLLUT SILMUKKAKAHVA -korjaus (löydös, katselmointi 29.9.2026): ensin kerätään KAIKKIEN tila+ääni-
            // parien tavoitetasot (ILMAN duckausta -- duckaus ei saa vaikuttaa siihen, pidetäänkö kahva ylipäätään
            // auki, ettei repliikki aiheuta kahvan sulkeutumista/avautumista kesken itsensä), pyytämättä yhtäkään
            // silmukkakahvaa tässä vaiheessa. Tehosteet (kertaäänet) eivät käytä poolia, ne pysyvät samassa kierroksessa.
            ehdokkaat.Clear();
            foreach (var tila in rak.Tilat)
            {
                int taso = nakyma.Tasot != null && nakyma.Tasot.TryGetValue(tila.Id, out var ts) ? ts : 0;
                // SilmukanTavoitetaso on TILALLINEN (liuku/alkoi per tilaId) -- kutsutaan AINA, myös Paalla=false,
                // ettei sen sisäinen liuku jää jälkeen; vain lopputulos (ehdokkaan Taso) nollataan kytkimellä.
                double tavoite = aanimaisema.SilmukanTavoitetaso(tila.Id, taso, nakyma.KohdeTila, t);
                // Yleisnäkymässä huoneiden silmukat vaimeina (× 0,3): linnan yleisäänet (massa: tuuli, laineet) johtavat, eikä
                // kuuden kahvan raja pudota niitä (1.1 (75) -mittaus: jarvi-laineet 0,35 jäi keittiön silmukoiden alle).
                // Omistaja 5.10. 00.5x ("Eikö kuoro yms äänet pitäisi tulla vasta myöhemmissä vaiheissa eikä yleisesittelyssä?"):
                // yleisnäkymässä ja kertojan esittelyssä vain linnan yleisäänet (massa: tuuli, laineet); huoneen äänet vain, kun kamera
                // on siinä huoneessa. Häivytys pehmeästi (Aanimaisema-liuku + kahvan 1,2 s:n liuku alla).
                bool huoneenAanet = tila.Id == Aanimaisema.MassaTilaId || (nakyma.KohdeTila == tila.Id && nakyma.KertojaJakso < 0);
                if (!huoneenAanet) tavoite = 0;
                foreach (var ap in tila.Aanet)
                {
                    double pankinVoimakkuus = rak.Aanet.TryGetValue(ap.AaniId, out var aani) ? aani.Voimakkuus : 1;
                    double taso01Raw = aanimaisemaPaalla ? tavoite * ap.Voimakkuus * pankinVoimakkuus
                        * Kerroin(HuoneKerroin, tila.Id) * Kerroin(TaustaKerroin, ap.AaniId) * Kerroin(RyhmaKerroin, Ryhma(ap.AaniId, true)) : 0;
                    ehdokkaat.Add((tila.Id, ap.AaniId, taso01Raw));
                }
                if (aanimaisemaPaalla)
                    for (int ti = 0; ti < tila.Tehosteet.Count; ti++)
                    {
                        // "soi vain kun tilan taso ≥ 1": ajastinta ei edes tikitetä matalammalla tasolla.
                        if (taso < 1) continue;
                        string aaniId = aanimaisema.TehosteenLaukaisu(tila.Id, ti, tila.Tehosteet[ti], t);
                        // Kertaäänet (askeleet, kuoro, tehosteet) vain siinä huoneessa, jossa kamera on (ei yleisnäkymässä eikä esittelyssä).
                        if (aaniId != null && huoneenAanet && tila.Id != Aanimaisema.MassaTilaId) SoitaKertaAani(aaniId, (float)tila.Tehosteet[ti].Voimakkuus);
                    }
            }

            // Sallitut: tavoitetaso > 0,01 JA enintään 6 suurinta (pooli on jaettu resurssi). Lajitellaan paikoillaan
            // suurin ensin -- kynnyksen alle jäävät ovat aina lajittelun lopussa, joten break riittää.
            ehdokkaat.Sort((a, b) => b.Taso.CompareTo(a.Taso));
            sallitut.Clear();
            // Sama ääni useasta tilasta (1.1 (78): linna-tuuli ja tulisija-ratina kolmesti) soi yhtenä kahvana suurimmalla
            // tasolla: ei päällekkäistä samaa klippiä eikä kuuden paikan tuhlausta.
            aaniNahty.Clear();
            for (int i = 0, n = 0; i < ehdokkaat.Count && n < 6; i++)
            {
                if (ehdokkaat[i].Taso <= 0.01) break;
                if (!aaniNahty.Add(ehdokkaat[i].Aani)) continue;
                sallitut.Add((ehdokkaat[i].Tila, ehdokkaat[i].Aani));
                n++;
            }

            string huone = nakyma.KohdeTila;
            if (huone != NykyinenHuone) { NykyinenHuone = huone; HuoneVaihtui?.Invoke(huone); aanettomat.Clear(); }
            bool puheSoi = puhuu || Time.unscaledTime < puheLoppuu || MuuPuheSoi;
            // Sovittimen duckaus puheen ajaksi (0,15); mikserin VaistoKerroin skaalaa väistön (1 = nykyinen, 0 = ei väistöä).
            double duck = puheSoi ? 1.0 - 0.85 * Kerroin(VaistoKerroin, huone ?? "") : 1.0;
            viimeDuck = (float)duck;
            // Kertaäänten ryhmät: sama väistö ja liuku (0,4 s) kuin silmukoilla, kerrottuna ryhmän mikserikertoimella.
            foreach (var kv in kertaLahteet)
                if (kv.Value != null)
                    kv.Value.volume = Mathf.MoveTowards(kv.Value.volume, (float)duck * Kerroin(RyhmaKerroin, kv.Key), Time.unscaledDeltaTime / 0.4f);
            soivatTaustat.Clear();
            foreach (var e in ehdokkaat) if (sallitut.Contains((e.Tila, e.Aani))) soivatTaustat.Add((e.Tila, e.Aani, (float)(e.Taso * duck)));
            foreach (var e in ehdokkaat)
            {
                var avainSilmukka = (e.Tila, e.Aani);
                if (sallitut.Contains(avainSilmukka))
                {
                    hiljaisuusAlkoi.Remove(avainSilmukka);
                    var kahva = HaeTaiLuoSilmukka(e.Tila, e.Aani);
                    if (kahva == null) continue;
                    // Väistö 0,4 s (puhe alkaa), huoneen vaihto 1,2 s (pehmeä sisään/ulos).
                    float liuku = Math.Abs(e.Taso - (edellinenTaso.TryGetValue(avainSilmukka, out var et) ? et : 0)) > 0.05 ? 1.2f : 0.4f;
                    edellinenTaso[avainSilmukka] = e.Taso;
                    kahva.Voimakkuus((float)Math.Clamp(e.Taso * duck, 0.0, 1.0), liuku);
                }
                else if (silmukat.TryGetValue(avainSilmukka, out var kahva) && kahva != null)
                {
                    kahva.Voimakkuus(0f, 1.2f); // häivytys kesken hiljaisuusikkunan (ei napsahda hiljaiseksi; huoneesta poistuminen pehmeästi)
                    edellinenTaso.Remove(avainSilmukka);
                    if (!hiljaisuusAlkoi.TryGetValue(avainSilmukka, out var alkoi)) hiljaisuusAlkoi[avainSilmukka] = t;
                    else if (t - alkoi >= 2.0)
                    {
                        kahva.Lopeta();
                        silmukat.Remove(avainSilmukka);
                        hiljaisuusAlkoi.Remove(avainSilmukka);
                    }
                }
            }

            // DUCKAUS ILMAN ÄÄNTÄ -korjaus (löydös, katselmointi 29.9.2026): puhujaksi merkitään (ja silmukoita
            // duckataan) VAIN kun repliikki OIKEASTI soi -- Kertoja-kytkin päällä JA klippi jo ladattu, ei pelkkä
            // askeleen vaihto. Askel (ei teksti) yksilöi vaihtumisen -- ks. Nakyma.Askel-kommentti.
            // Kertojan kierros (Pelikoodari 1.10.2026, #3742: kertoja.jaksot[].aani, isoisä): jakson vaihtuessa edellinen
            // puhe katkeaa ja uusi alkaa; kierroksen katketessa (huoneen kohdistus, paluu) puhe loppuu.
            // Puhe alkaa tekstin kanssa (teksti nousee lennon 60 %:ssa), ei lennon alussa.
            int jaksoNyt = nakyma.KertojaTeksti != null ? nakyma.KertojaJakso : -1;
            if (jaksoNyt != viimeJakso)
            {
                aanettomat.Clear();
                if (viimeJakso >= 0) LopetaErillinen();
                viimeJakso = jaksoNyt;
                odottavaJakso = -1;
                if (viimeJakso >= 0 && viimeJakso < rak.Kertoja.Count && kertojaPaalla)
                {
                    // Puhdas asennus (tuotantoajo 3.10. 01.45: piha-jakso jäi äänettömäksi): klippi ei ehtinyt latautua ennen
                    // jaksoa, ja yksi yritys jätti jakson pysyvästi hiljaiseksi. Nyt jakso odottaa latausta ja alkaa, kun klippi
                    // valmistuu, jos sama jakso on yhä ruudulla eikä viivettä ole yli KertojaOdotusS.
                    string id = rak.Kertoja[viimeJakso].Aani;
                    bool valmis = KlippiValmis(id);
                    SoitaErillinen(id, false);
                    if (!valmis && !string.IsNullOrEmpty(id)) { odottavaJakso = viimeJakso; odottavaAlku = Time.unscaledTime; Debug.Log($"MATKAKIRJA linssit: poikki: kertojan jakso {id} odottaa latausta"); }
                }
            }
            else if (odottavaJakso >= 0 && odottavaJakso == viimeJakso && odottavaJakso < rak.Kertoja.Count)
            {
                string id = rak.Kertoja[odottavaJakso].Aani;
                float viive = Time.unscaledTime - odottavaAlku;
                if (!kertojaPaalla) odottavaJakso = -1;
                else if (KlippiValmis(id))
                {
                    odottavaJakso = -1;
                    if (SoitaErillinen(id, false)) Debug.Log($"MATKAKIRJA linssit: poikki: kertojan jakso {id} alkoi latauksen jälkeen ({viive:F1} s)");
                }
                else if (viive > KertojaOdotusS)
                {
                    odottavaJakso = -1;
                    Debug.Log($"MATKAKIRJA linssit: poikki: kertojan jakso {id} jäi soimatta (ei latautunut {KertojaOdotusS:F0} s:ssa)");
                }
            }

            string avain = nakyma.Puhuja == null ? null : nakyma.KohdeTila + "|" + nakyma.Askel;
            if (avain != viimeAskelAvain)
            {
                bool uusiAskel = avain != null;
                bool aaniSoi = uusiAskel && kertojaPaalla && AaniOnValmis(nakyma.AskeleenAani);
                // Repliikit etenevät käsikirjoituksen mukaan itsestään (savuke 1125: 2 repliikkiä katkaisi luennon 4 s:n kohdalla);
                // pelaajan tekona vain heti napautuksen (DioraamaSyote) jälkeen.
                if (aaniSoi) aaniSoi = SoitaPuhe(nakyma.AskeleenAani, Time.unscaledTime - napautusAika < 1.5f);
                if (aaniSoi != puhuu) { y?.Repliikki(aaniSoi); puhuu = aaniSoi; }
                viimeAskelAvain = avain;
            }
        }

        /// <summary>Linssi sulkeutuu: kaikki silmukat Lopeta, kertaäänet seis, puhuja pois (task-speksi). Klippi-
        /// välimuisti ja rakennus-viittaus säilyvät (ks. luokan alkukommentti) — seuraava Avaa nollaa loput.</summary>
        public void Sulje()
        {
            if (Aanet.LinssiPuhuu != null) { Aanet.LinssiPuhuu = null; Aanet.LinssiPuheKatkaise = null; }
            if (Puhe.Instanssi != null) Puhe.Instanssi.Puhuu -= PuheLuentaAlkoi;
            foreach (var s in silmukat.Values) s?.Lopeta();
            silmukat.Clear();
            hiljaisuusAlkoi.Clear();
            if (kertaAaniLahde != null) kertaAaniLahde.Stop();
            foreach (var l in kertaLahteet.Values) if (l != null) l.Stop();
            if (puheKuiva != null) puheKuiva.Stop();
            if (puheKaiku != null) puheKaiku.Stop();
            puheLoppuu = -1f;
            if (aktiivinen == this) aktiivinen = null;
            AaniMikseri.LinnaTila(false);
            DioraamaLimitteri.Paalle(false);
            y?.Repliikki(false);
            puhuu = false;
            viimeAskelAvain = null;
            y = null;
        }

        ISilmukka HaeTaiLuoSilmukka(string tilaId, string aaniId)
        {
            var avain = (tilaId, aaniId);
            if (silmukat.TryGetValue(avain, out var s)) return s;
            if (y == null || rakennus == null || !rakennus.Aanet.TryGetValue(aaniId, out var aani)) return null;
            string url = sovitin.AaniUrl(aani.Tiedosto);
            if (url == null) return null;
            var kahva = y.Silmukka(url);
            silmukat[avain] = kahva;
            return kahva;
        }

        /// <summary>Soittaa yhden äänipankin id:n kertaäänenä valmiiksi ladatulta klipiltä (PlayOneShot sallii monta
        /// päällekkäistä soittoa samalta lähteeltä). Jos klippi ei ole vielä valmis, käynnistää latauksen mutta EI
        /// jää odottamaan — tämä laukaisu jää hiljaiseksi (poikkeama raportoitu: ks. TilaValmis/RakennusValmis
        /// esilataavat kaiken tunnetun etukäteen, joten tämä koskee vain harvinaista myöhässä saapunutta dataa).</summary>
        void SoitaKertaAani(string aaniId, float voimakkuus)
        {
            if (string.IsNullOrEmpty(aaniId) || rakennus == null || !rakennus.Aanet.TryGetValue(aaniId, out var aani)) return;
            string url = sovitin.AaniUrl(aani.Tiedosto);
            if (url == null) return;
            var lahde = kertaLahteet.TryGetValue(Ryhma(aaniId, false), out var rl) && rl != null ? rl : kertaAaniLahde;
            if (klipit.TryGetValue(url, out var klippi) && klippi != null) lahde.PlayOneShot(klippi, voimakkuus);
            else VarmistaLadattu(url);
        }

        /// <summary>Onko aaniId:n klippi jo ladattu valmiiksi soitettavaksi (SoitaKertaAani soittaisi sen HETI, ei
        /// jää odottamaan latausta) — käytetään päättämään, soiko puheääni OIKEASTI ennen duckausta/Repliikki-
        /// merkintää (DUCKAUS ILMAN ÄÄNTÄ -löydös, katselmointi 29.9.2026: Kertoja-kytkin pois tai kesken oleva
        /// lataus eivät saa väistää silmukoita/muita äänikanavia turhaan).</summary>
        bool AaniOnValmis(string aaniId)
        {
            if (string.IsNullOrEmpty(aaniId) || rakennus == null || !rakennus.Aanet.TryGetValue(aaniId, out var aani)) return false;
            if (MikseriTila && Klippi(aani.Kuiva) != null) return true;
            return Klippi(aani.Tiedosto) != null;
        }

        AudioClip Klippi(string tiedosto)
        {
            if (string.IsNullOrEmpty(tiedosto)) return null;
            string url = sovitin.AaniUrl(tiedosto);
            return url != null && klipit.TryGetValue(url, out var k) ? k : null;
        }

        /// <summary>Repliikki tai kuunnelman rivi puheväylälle (−3 dB). Mikseritilassa kuiva + kaiku (lyhyt/pitkä) kahdelta
        /// lähteeltä samalla dspTime-hetkellä (PlayScheduled +50 ms); kaiun taso KaikuKerroin[huone] (KaikuPois → 0).
        /// Muuten Tiedosto kuten ennen. Palauttaa, soiko.</summary>
        bool SoitaPuhe(string aaniId, bool kayttaja)
        {
            if (string.IsNullOrEmpty(aaniId) || rakennus == null || !rakennus.Aanet.TryGetValue(aaniId, out var aani)) return false;
            if (MikseriTila && !string.IsNullOrEmpty(aani.Kuiva) && puheKuiva != null)
            {
                var kuiva = Klippi(aani.Kuiva);
                string kaikuPolku = KaikunPituus == "pitka" && !string.IsNullOrEmpty(aani.KaikuPitka) ? aani.KaikuPitka : aani.Kaiku;
                var kaiku = Klippi(kaikuPolku);
                if (kuiva != null)
                {
                    double hetki = AudioSettings.dspTime + 0.05;
                    if (!AloitaPuhe(kayttaja, aaniId)) return false;
                    puheKuiva.clip = kuiva; puheKuiva.volume = PuheTaso; puheKuiva.PlayScheduled(hetki);
                    float kaikuTaso = KaikuPois ? 0f : Kerroin(KaikuKerroin, NykyinenHuone ?? "", 1f);
                    if (kaiku != null && kaikuTaso > 0.001f)
                    { puheKaiku.clip = kaiku; puheKaiku.volume = PuheTaso * kaikuTaso; puheKaiku.PlayScheduled(hetki); }
                    puheLoppuu = Time.unscaledTime + Math.Max(kuiva.length, kaiku != null ? kaiku.length : 0f) + 0.05f;
                    Debug.Log($"MATKAKIRJA linssit: poikki: mikseri {aaniId}: kuiva {kuiva.length:F3} s + kaiku {(kaiku != null && kaikuTaso > 0.001f ? kaiku.length.ToString("F3") + " s × " + kaikuTaso.ToString("F2") : "pois")}, dsp {hetki:F3}");
                    return true;
                }
                VarmistaLadattu(sovitin.AaniUrl(aani.Kuiva));
                if (!string.IsNullOrEmpty(kaikuPolku)) VarmistaLadattu(sovitin.AaniUrl(kaikuPolku));
            }
            var k = Klippi(aani.Tiedosto);
            if (k == null) { VarmistaLadattu(sovitin.AaniUrl(aani.Tiedosto)); return false; }
            // Ennen PlayOneShot kertaäänilähteeltä: repliikkiä ei voinut katkaista, ja seuraava puhe (vartija, kortti,
            // kertoja, Pulu) soi sen päälle. Nyt sama pysäytettävä puhelähde kuin kertojalla.
            if (!AloitaPuhe(kayttaja, aaniId)) return false;
            puheKuiva.clip = k; puheKuiva.volume = PuheTaso; puheKuiva.Play();
            puheLoppuu = Time.unscaledTime + k.length;
            return true;
        }

        int viimeJakso = -1;
        /// <summary>Kertojan jakso, jonka klippi latautuu vielä (−1 = ei odottavaa) ja odotuksen alku; yli KertojaOdotusS myöhässä jakso jää soimatta.</summary>
        int odottavaJakso = -1;
        float odottavaAlku;
        const float KertojaOdotusS = 4f;

        bool KlippiValmis(string aaniId) =>
            !string.IsNullOrEmpty(aaniId) && rakennus != null && rakennus.Aanet.TryGetValue(aaniId, out var aani) && Klippi(aani.Tiedosto) != null;

        /// <summary>Testikomento "poikki aanet unohda-kertoja": kertojan klipit pois välimuistista, jolloin seuraava jakso joutuu
        /// odottamaan latausta kuten puhtaalla asennuksella (latausodotuksen todennus). Palauttaa poistettujen määrän.</summary>
        public int UnohdaKertoja()
        {
            int n = 0;
            if (rakennus == null) return 0;
            foreach (var j in rakennus.Kertoja)
                if (!string.IsNullOrEmpty(j.Aani) && rakennus.Aanet.TryGetValue(j.Aani, out var aani))
                {
                    string url = sovitin.AaniUrl(aani.Tiedosto);
                    if (url != null && klipit.Remove(url)) n++;
                }
            return n;
        }

        /// <summary>Kertojan jakso tai Pulun kertomus omalta, pysäytettävältä lähteeltä (puheväylä −3 dB, taustat väistävät
        /// puheen ajan). Katkaisee edellisen erillisen puheen. Lataamaton klippi jää soittamatta (esiladattu avatessa).</summary>
        string erillinenId;
        /// <summary>Avainsanojen ajoitus (DioraamaTaulu): kertojan klipin soittokohta sekunteina, jos juuri tämä puhe soi; muuten null.</summary>
        public static float? PuheenKohta(string aaniId) =>
            aktiivinen != null && aaniId != null && aktiivinen.erillinenId == aaniId && aktiivinen.puheKuiva != null && aktiivinen.puheKuiva.isPlaying
                ? aktiivinen.puheKuiva.time : (float?)null;

        bool SoitaErillinen(string aaniId, bool kayttaja)
        {
            if (string.IsNullOrEmpty(aaniId) || rakennus == null || !rakennus.Aanet.TryGetValue(aaniId, out var aani) || puheKuiva == null) return false;
            var k = Klippi(aani.Tiedosto);
            if (k == null) { VarmistaLadattu(sovitin.AaniUrl(aani.Tiedosto)); return false; }
            if (!AloitaPuhe(kayttaja, aaniId)) return false;
            puheKuiva.clip = k; puheKuiva.volume = PuheTaso; puheKuiva.Play();
            puheLoppuu = Time.unscaledTime + k.length;
            erillinenId = aaniId;
            Debug.Log($"MATKAKIRJA linssit: poikki: erillinen puhe {aaniId} {k.length:F1} s");
            return true;
        }

        /// <summary>Linnan uusi puhe katkaisee edellisen linnan puheen sekä pelin muut puheet (Pulun repliikki, kertojan
        /// luenta, Puhe-luenta), jotta kerrallaan soi yksi puhe (omistaja 2.10.).</summary>
        /// <summary>Savuke 1124: itsestään etenevä linnan puhe (kertojan jakso, kuunnelman rivi) ei katkaise pelaajan pyytämää
        /// puhetta (Pulun chat-vastaus, luento), vaan jää soimatta (teksti näkyy, ks. Puhutaan). Pelaajan teko katkaisee.</summary>
        bool AloitaPuhe(bool kayttaja, string aaniId = null)
        {
            if (!kayttaja && MuuPuheSoi)
            {
                Debug.Log("MATKAKIRJA linssit: poikki: linnan puhe odottaa (muu puhe soi)");
                // Odottamaan jäänyt rivi näytetään tekstinä (simu 2.10.: kertojan jakso jäi muuten äänettä ja tekstittä).
                if (aaniId != null) aanettomat.Add(aaniId);
                return false;
            }
            puheKuiva.Stop(); puheKaiku.Stop();
            katkaiseeMuita = true;
            try
            {
                Aanet.Pysayta(AaniKanava.Puhe);
                Aanet.Pysayta(AaniKanava.Kertoja);
                if (Puhe.Instanssi != null && Puhe.Instanssi.Soi) Puhe.Instanssi.Pysayta();
            }
            finally { katkaiseeMuita = false; }
            Debug.Log("MATKAKIRJA linssit: poikki: puhevuoro linnalle (muut puheet katkaistu)" + (aaniId != null ? ": " + aaniId : ""));
            return true;
        }

        /// <summary>Soiko pelin muu puhe (Puhe: luento tai Pulun chat-vastaus; kertojakanava).</summary>
        static float napautusAika = -10f;
        /// <summary>Pelaaja napautti dioraamaa (DioraamaSyote): seuraava repliikki on pelaajan teko ja saa katkaista muun puheen.</summary>
        public static void Napautettu() => napautusAika = Time.unscaledTime;

        bool MuuPuheSoi => (Puhe.Instanssi != null && Puhe.Instanssi.Soi) || (Aanet.Kertojasoitin != null && Aanet.Kertojasoitin.isPlaying);
        bool muuSoi;
        /// <summary>Muun puheen vuoksi soimatta jääneet rivit (näkyvät tekstinä); tyhjennetään jakson ja huoneen vaihtuessa.</summary>
        readonly HashSet<string> aanettomat = new HashSet<string>();

        /// <summary>Joka ruutu: muun puheen alku (nouseva reuna) katkaisee linnan puheen, vaikka Puhe.Puhuu-tilaus puuttuisi
        /// (Puhe luodaan laiskasti; savuke 1124: Pulun vastaus soi linnan puheen päällä).</summary>
        void SeuraaMuutaPuhetta()
        {
            bool nyt = MuuPuheSoi;
            if (nyt && !muuSoi && !katkaiseeMuita)
            {
                Debug.Log($"MATKAKIRJA linssit: poikki: muu puhe alkoi (linnan puhe {(PuheSoi ? "katkeaa" : "ei soi")})");
                KatkaisePuhe();
            }
            muuSoi = nyt;
        }

        bool katkaiseeMuita;

        /// <summary>Soiko linnan puhe (repliikki, kertoja, Pulun kertomus, kuunnelma).</summary>
        public bool PuheSoi => (puheKuiva != null && puheKuiva.isPlaying) || (puheKaiku != null && puheKaiku.isPlaying)
                               || Time.unscaledTime < puheLoppuu;

        /// <summary>Muu puhe alkoi (kortin luenta, kertoja): linnan puhe katkeaa.</summary>
        public void KatkaisePuhe()
        {
            if (katkaiseeMuita || !PuheSoi) return;
            puheKuiva?.Stop(); puheKaiku?.Stop();
            puheLoppuu = -1f;
            Debug.Log("MATKAKIRJA linssit: poikki: linnan puhe katkaistu (uusi luenta)");
        }

        void PuheLuentaAlkoi(bool alkoi)
        {
            // Myös Pulun chat-vastauksen ääneen luku (Puhe, persoona pollo; PuluChat) on pelaajan pyytämä uusi puhe, joten se
            // katkaisee linnan puheen (2.10. ristikatkaisutodennus: ennen molemmat soivat).
            if (alkoi && !katkaiseeMuita) KatkaisePuhe();
        }

        void LopetaErillinen()
        {
            if (puheKuiva != null && puheKuiva.isPlaying) { puheKuiva.Stop(); puheKaiku.Stop(); puheLoppuu = -1f; }
        }

        /// <summary>Pulun kertomus (DioraamaTaulu: Pulun napautus), Kertoja-kytkimen mukaan.</summary>
        public static bool SoitaPulu(string aaniId) =>
            aktiivinen != null && aktiivinen.Paalla && Asetukset.Paalla(Kytkin.Kertoja) && aktiivinen.SoitaErillinen(aaniId, true);

        /// <summary>Pulun kertomuksen kesto (kuplan näyttöaika), null = tuntematon.</summary>
        public static float? PuluKesto(string aaniId) => aktiivinen?.PuheenKesto(aaniId);

        /// <summary>Kuuluuko tämä puhe ääneen (äänite on pankissa ja Kertoja-kytkin päällä): silloin sen tekstiä ei näytetä
        /// kuplana (omistaja 2.10. klo 14.1x, loki 14.09: "näytä vain tekstinä sellaista mitä ei puhuta").</summary>
        public static bool Puhutaan(string aaniId) =>
            !string.IsNullOrEmpty(aaniId) && aktiivinen != null && aktiivinen.Paalla && Asetukset.Paalla(Kytkin.Kertoja)
            && aktiivinen.rakennus != null && aktiivinen.rakennus.Aanet.ContainsKey(aaniId)
            && (aktiivinen.PuheSoi || !aktiivinen.MuuPuheSoi) // muun puheen aikana linnan rivi jää tekstiksi
            && !aktiivinen.aanettomat.Contains(aaniId);

        /// <summary>Puheen kesto sekunteina (kuunnelman ajoitus): ladattu klippi, muuten pankin kesto_s, muuten null.</summary>
        float? PuheenKesto(string aaniId)
        {
            if (string.IsNullOrEmpty(aaniId) || rakennus == null || !rakennus.Aanet.TryGetValue(aaniId, out var aani)) return null;
            var k = (MikseriTila ? Klippi(aani.Kuiva) : null) ?? Klippi(aani.Tiedosto);
            if (k != null) return k.length;
            return aani.KestoS > 0 ? (float)aani.KestoS : (float?)null;
        }

        void VarmistaLadattu(string url)
        {
            if (string.IsNullOrEmpty(url) || klipit.ContainsKey(url) || klipitJonossa.Contains(url)) return;
            klipitJonossa.Add(url);
            o.StartCoroutine(LataaKlippi(url));
        }

        IEnumerator LataaKlippi(string url)
        {
            using var p = UnityWebRequestMultimedia.GetAudioClip(url, AudioType.MPEG);
            var dh = (DownloadHandlerAudioClip)p.downloadHandler;
            dh.streamAudio = false;
            dh.compressed = true; // EsityksenAani-malli: ei pääsäikeen PCM-purkua
            p.timeout = 20;
            yield return p.SendWebRequest();
            klipitJonossa.Remove(url);
            if (p.result != UnityWebRequest.Result.Success) { o.Kirjaa("poikki: ääni " + url + " ei latautunut: " + p.error); yield break; }
            klipit[url] = DownloadHandlerAudioClip.GetContent(p);
        }

        /// <summary>Soivien silmukoiden tunnukset "tila/ääni" (Laitetestaajan ehdotus 30.9.: laineet näkyviin raportissa).</summary>
        IEnumerable<string> SilmukkaIdt()
        {
            foreach (var k in silmukat.Keys) yield return k.Item1 + "/" + k.Item2;
        }

        /// <summary>Tila lokiin ("poikki aanet"): ladatut klipit, jonossa olevat, soivat silmukat, puhuja.</summary>
        public string Tilaraportti()
        {
            int soivia = 0;
            foreach (var s in silmukat.Values) if (s != null) soivia++;
            var ryhmat = new List<string>();
            foreach (var kv in kertaLahteet) if (kv.Value != null) ryhmat.Add($"{kv.Key} {kv.Value.volume:0.00}");
            return $"poikki aanet: {(Paalla ? "päällä" : "pois")}, väistö {viimeDuck:0.00}, kertaäänet [{string.Join(", ", ryhmat)}], äänimaisema-kytkin {(Asetukset.Paalla(Kytkin.Aanimaisema) ? "päällä" : "POIS (silmukat hiljaa)")}, " +
                   $"kertoja-kytkin {(Asetukset.Paalla(Kytkin.Kertoja) ? "päällä" : "pois")}, klippejä ladattu {klipit.Count} (jonossa {klipitJonossa.Count}), " +
                   $"silmukoita {silmukat.Count} (kahvoja {soivia}: {string.Join(", ", SilmukkaIdt())}), puhuja {(puhuu ? "kyllä" : "ei")}, " +
                   $"limitteri {(DioraamaLimitteri.Instanssi != null && DioraamaLimitteri.Instanssi.enabled ? "päällä, pienin vahvistus " + DioraamaLimitteri.Instanssi.PieninVahvistusJaNollaa().ToString("0.000") : "pois")}";
        }
    }
}
