// ALOITUSINTRO (omistaja 11.10. 11.5x PT:n kautta, juna 182; lisävaatimukset 12.1x): 18 s:n intro aloituskaupungeissa Ateena,
// Pariisi ja Tukholma (KaupunkiIntro.Aloitukset). William (uusi kertoja) sanoo kaupungin nimen ja iskulauseen, kaupungin nopea
// kappale alkaa samassa ruudussa (Puhe.Puhuu → Aanisoitin.SaapumisPuheAlkoi, kuten saapumistrailerissa isoisän puheen kanssa),
// kuusi lähes koko ruudun kuvaa 3 s välein (Introesitys, sama pohja kuin Pariisin C1–C5) ja kaupungin nimi + iskulause kirjain
// kerrallaan Williamin puheen ajan. Ohita näkyy koko ajan. Lopussa (18 s tai Ohita) valmis(ohitettu): PeliOhjain vie kartalle ja
// laukaisee KaupunkiIntro.Paattyi. Musiikin jatko: nopea katkeaa intron lopussa 2 s:n häivytyksellä ja kaupungin kappale alkaa
// 1 s myöhemmin (Aanisoitin.KaupunkiIntro kuten Pariisin esittelyssä, Ohita tekee saman heti): Ateena ja Pariisi oma kappale,
// Tukholma pohjolan alueraita (PT 12.3x). Kuvat: KaupunkiIntro.AloitusKuvaOsoitteet (Pariisi C1–C4, 1. avauskuva, C5; muut
// avauskuvat ja vajaus kansikuvista, alle kuuden kiertää alusta). Pariisi joka käynnillä samalla 18 s:n muodolla (PT 12.3x).
// Kirjaukset: "MATKAKIRJA ui saapuminen: aloitusintro <k> alkaa / kuva n / William alkaa / päättyi (ohitettu …)".
using System;
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Linssit.Kierros;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class AloitusintroNakyma
    {
        /// <summary>
        /// SIMU 25a2dca37 (maailmahyppy: kuvat 0, William 2,47 s myöhässä): intro odottaa enintään näin kauan, että kaupungin lehti
        /// (avaus- ja kansikuvat), Williamin repliikki, esiladattu nopea ja ensimmäinen kuva ovat valmiina. Sen jälkeen kello, kuva 1,
        /// William ja musiikki alkavat samassa ruudussa (kello lähtee Puhe.Puhuu-hetkestä). Odotuksen ajan esitys on auki (tumma pohja).
        /// </summary>
        public const int ValmisOdotusMs = 1500;
        /// <summary>Jos William ei ala (kertoja pois, virhe), ohjelma alkaa viimeistään näin kauan Soita-kutsun jälkeen.</summary>
        public const int PuheVaraMs = 600;

        readonly Introesitys esitys;
        readonly Matkakirjakortti kortti;
        readonly List<IVisualElementScheduledItem> ajastimet = new List<IVisualElementScheduledItem>();
        Action<bool> valmis;
        string kaupunki;
        bool kaynnissa, pelista, musiikkiKatko;
        float alkoi;
        int kerta;
        Puhe puheKuunneltu;
        Action<bool> puheAlkoi;

        public bool Kaynnissa => kaynnissa;
        public string Kaupunki => kaynnissa ? kaupunki : null;

        public AloitusintroNakyma(Introesitys esitys, Matkakirjakortti kortti)
        {
            this.esitys = esitys;
            this.kortti = kortti;
            UiSisalto.LehdetSaapuivat += () =>
            {
                if (!kaynnissa) return;
                var l = KuvaSarja(out string lahteet);
                Debug.Log($"MATKAKIRJA ui saapuminen: aloitusintro {kaupunki} lehti saapui {Time.unscaledTime:0.000}: kuvat {l.Count} ({lahteet})");
            };
        }

        static IVisualElementScheduler Ajastin => UiKerros.Hae().Juuri(Introesitys.Kerros).schedule;

        /// <summary>
        /// PeliOhjaimen kutsu (PeliNakymat.Aloitusintro): intro alkaa; kunValmis(ohitettu) kerran. Vahtii pelin tilaa (Traileri),
        /// kuten saapumistraileri. Ei introa = valmis heti (ohitettu = false).
        /// </summary>
        public void NaytaPelista(string k, Action<bool> kunValmis) => Nayta(k, true, kunValmis);

        /// <summary>QA (ui aloitusintro &lt;k&gt;): sama intro ilman lentoa; palauttaa virheen tai null.</summary>
        public string NaytaQa(string k, Action<bool> kunValmis)
        {
            if (KaupunkiIntro.AloitusintroData(k) == null) return "ei aloitusintroa: " + k + " (" + string.Join(", ", KaupunkiIntro.Aloitukset.Keys) + ")";
            if (kaynnissa) return "aloitusintro on jo käynnissä: " + kaupunki;
            Nayta(k, false, kunValmis);
            return null;
        }

        /// <summary>
        /// Kuusi kuvaa kaupungin nykyisestä sisällöstä (KaupunkiIntro.AloitusKuvaOsoitteet): avauskuvat, vajaus kansikuvista ja
        /// varalla isoisän luentakuvista ja PuluCam-kuvista (Fokusvirrat), jotta intro ei koskaan jää ilman kuvia. Lasketaan
        /// uudelleen jokaisen kuvan vuorolla: myöhässä saapuva lehti tulee sarjaan seuraavasta kuvasta alkaen.
        /// </summary>
        List<string> KuvaSarja(out string lahteet)
        {
            var kt = UiSisalto.Kaupunki(kaupunki);
            var avaus = kt?.Avauskuvat.Select(x => x.Tiedosto).ToList();
            var vara = new List<string>();
            if (kt != null) vara.AddRange(kt.Kansikuvat.Select(x => x.Tiedosto));
            var v = Fokusvirrat.Hae(kaupunki);
            int fokus = 0;
            if (v != null)
            {
                foreach (var x in v.Luentakuvat) { vara.Add(x.Osoite); fokus++; }
                foreach (var x in v.PuluKuvat) { vara.Add(x.Osoite); fokus++; }
            }
            lahteet = $"avauskuvia {avaus?.Count ?? 0}, kansikuvia {kt?.Kansikuvat.Count ?? 0}, fokuskuvia {fokus}, lehti {(UiSisalto.LehtiLuettu(kaupunki) ? "luettu" : "ei vielä")}";
            return KaupunkiIntro.AloitusKuvaOsoitteet(kaupunki, avaus, vara);
        }

        void Nayta(string k, bool pelistaKutsu, Action<bool> kunValmis)
        {
            var data = KaupunkiIntro.AloitusintroData(k);
            if (data == null || kaynnissa) { kunValmis?.Invoke(false); return; }
            kaupunki = data.Kaupunki;
            kaynnissa = true;
            pelista = pelistaKutsu;
            valmis = kunValmis;
            int oma = ++kerta;
            alkoi = Time.unscaledTime;
            // Edellisen paikan matkakirjakortti ja sen kuvat pois intron alta (simu 25a2dca37: Ateenan kortti näkyi Pariisin intron
            // aikana); uuden kaupungin merkintä tulee intron jälkeen (Saapumisesitys.Saapui).
            kortti?.Tyhjenna();
            kortti?.Kuvat.Tyhjenna(false);
            esitys.Aloita("aloitusintro " + kaupunki, () => Lopeta(true));
            // Vahti: peli ohitti (testikomento ohita-traileri, uusi matka) → intro pois.
            ajastimet.Add(Ajastin.Execute(Vahdi).Every(250));
            // Lehti ja William heti (myös QA ja hyppy; matkalla ne ladattiin jo SaapuminenTiedossa-hetkellä).
            UiSisalto.LataaLehti(kaupunki);
            Puhe.Hae()?.Esilataa(data.WilliamUrl, Taso.Nakyva);
            UiSisalto.Lataa(() =>
            {
                if (oma != kerta || !kaynnissa) return;
                UiSisalto.LataaLehti(kaupunki); // ennen Valmis-tilaa pyyntö odotti
                Aloita(data, oma);
            });
        }

        void Aloita(KaupunkiIntro.Aloitus data, int oma)
        {
            var kt = UiSisalto.Kaupunki(kaupunki);
            // Musiikki: esiladattu nopea odottaa Williamia (AaniTila.NopeaOdottaaPuhetta); QA:ssa nopea alusta, jos kaupungissa.
            var aani = Aanisoitin.Instanssi;
            bool odottaa = aani?.Tila?.OdottaaPuhetta == kaupunki;
            bool qaMusiikki = false;
            if (!pelista && !odottaa && aani?.Tila != null) qaMusiikki = aani.Tila.JaksonEsitysAlusta(kaupunki);
            // Katko + kaupungin kappale intron lopussa (vain jos nopea soi tai on tulossa ja jatkokappale on).
            musiikkiKatko = aani?.Tila != null && (odottaa || qaMusiikki || aani.Tila.Jakso == kaupunki + ":nopea") && aani.Tila.JaksollaHidas(kaupunki);
            if (musiikkiKatko) aani.KaupunkiIntro(kaupunki, KaupunkiIntro.AloitusKatkoS, KaupunkiIntro.AloitusHaivytysS, KaupunkiIntro.AloitusHidasS);
            Debug.Log($"MATKAKIRJA ui saapuminen: aloitusintro {kaupunki} alkaa {Time.unscaledTime:0.000} ({(pelista ? "saapuminen" : "QA")}, "
                      + $"musiikki {(odottaa ? "esiladattu odottaa" : qaMusiikki ? "QA alusta" : aani?.Tila?.Jakso ?? "ei jaksoa")}, "
                      + $"jatko {(musiikkiKatko ? "katko 18 s → kaupungin kappale" : "nopea jatkuu")}, William {data.WilliamUrl})");

            // Ensimmäinen kuva valmiiksi muistiin odotuksen aikana (Kuvat.Hae pitää sen muistissa: kuva 1 tulee samassa ruudussa).
            string ekaUrl = null;
            bool ekaValmis = false;
            void HaeEka()
            {
                var l = KuvaSarja(out _);
                var u = l.Count > 0 ? l[0] : null;
                if (u == null || u == ekaUrl) return;
                ekaUrl = u;
                ekaValmis = false;
                Kuvat.Hae(u, t => { if (u == ekaUrl) ekaValmis = true; });
            }
            HaeEka();

            bool ohjelmaAlkoi = false;
            void Ohjelma(string syy)
            {
                if (ohjelmaAlkoi || oma != kerta || !kaynnissa) return;
                ohjelmaAlkoi = true;
                alkoi = Time.unscaledTime;
                Debug.Log($"MATKAKIRJA ui saapuminen: aloitusintro {kaupunki} kello alkaa {alkoi:0.000} ({syy})");
                // Kuvat 3 s välein; kuva valitaan vuorollaan nykyisestä sisällöstä (myöhässä tullut lehti mukaan).
                for (int i = 0; i < KaupunkiIntro.AloitusKuvia; i++)
                {
                    int n = i + 1, ix = i;
                    void Kuva()
                    {
                        var sarja = KuvaSarja(out string lahteet);
                        if (ix >= sarja.Count)
                        {
                            Debug.Log($"MATKAKIRJA ui saapuminen: aloitusintro {kaupunki} kuva {n} puuttuu ({lahteet})");
                            return;
                        }
                        Debug.Log($"MATKAKIRJA ui saapuminen: aloitusintro {kaupunki} kuva {n} {Time.unscaledTime:0.000} (intron alusta {Time.unscaledTime - alkoi:0.00} s) {System.IO.Path.GetFileName(sarja[ix] ?? "")}");
                        esitys.Kuva(sarja[ix], kaupunki + " " + n);
                    }
                    if (i == 0) Kuva(); else Ajasta((int)(KaupunkiIntro.AloitusKuvaAlkaa(i) * 1000), Kuva);
                }
                esitys.Nimi(kt?.Nimi ?? UiSisalto.Kaupunki(kaupunki)?.Nimi ?? kaupunki, kt?.Iskulause ?? UiSisalto.Kaupunki(kaupunki)?.Iskulause);
                Ajasta((int)(KaupunkiIntro.AloitusNimiPoisS * 1000), esitys.NimiPois);
                Ajasta((int)(KaupunkiIntro.AloitusKestoS * 1000), () => Lopeta(false));
            }

            void Kaynnista(float odotettuMs, string tila)
            {
                if (oma != kerta || !kaynnissa) return;
                var sarja = KuvaSarja(out string lahteet);
                Debug.Log($"MATKAKIRJA ui saapuminen: aloitusintro {kaupunki} valmis {odotettuMs:0} ms odotuksen jälkeen ({tila}); kuvat {sarja.Count} ({lahteet}): "
                          + string.Join(" | ", sarja.Select(x => System.IO.Path.GetFileName(x ?? ""))));
                // William: Puhe.Puhuu = sama ruutu kuin Play → kello, kuva 1 ja nopea samaan hetkeen (Bluetooth-esilämmitys mukaan).
                var puhe = Puhe.Hae();
                KuunteleAlkua(puhe, viive =>
                {
                    if (viive > 0f) Ajasta((int)(viive * 1000), () => Ohjelma("William alkoi"));
                    else Ohjelma("William alkoi");
                });
                if (puhe == null || !puhe.Soita(data.WilliamUrl, 0, () => Debug.Log($"MATKAKIRJA ui saapuminen: aloitusintro {kaupunki} William loppui {Time.unscaledTime:0.000} (intron alusta {Time.unscaledTime - alkoi:0.00} s)")))
                {
                    LopetaKuuntelu();
                    Debug.Log($"MATKAKIRJA ui saapuminen: aloitusintro {kaupunki} William ei soi (kertoja pois tai ei puhetta), musiikki intron alusta {Time.unscaledTime:0.000}");
                    Aanisoitin.SaapumisPuheAlkoi(kaupunki);
                    Ohjelma("ilman Williamia");
                    return;
                }
                // Varmistus: William ei alkanut (lataus jumissa) → ohjelma ja musiikki silti.
                Ajasta(PuheVaraMs, () =>
                {
                    if (ohjelmaAlkoi) return;
                    LopetaKuuntelu();
                    Aanisoitin.SaapumisPuheAlkoi(kaupunki);
                    Ohjelma($"William ei alkanut {PuheVaraMs} ms:ssä");
                });
            }

            // Odotus: lehti, William, musiikki ja kuva 1 valmiina, enintään ValmisOdotusMs (kuten trailerin MusiikinOdotusMs).
            float odotusAlkoi = Time.unscaledTime;
            bool kaynnistetty = false;
            string Puuttuu()
            {
                var p = new List<string>();
                if (!UiSisalto.LehtiLuettu(kaupunki)) p.Add("lehti");
                if (!Puhe.Valmiina(data.WilliamUrl)) p.Add("William");
                if (odottaa && !Aanisoitin.EsitysMusiikkiValmis(kaupunki)) p.Add("musiikki");
                HaeEka();
                if (ekaUrl == null || !ekaValmis) p.Add("kuva 1");
                return p.Count == 0 ? null : string.Join("+", p);
            }
            void Tarkista()
            {
                if (kaynnistetty || !kaynnissa || oma != kerta) return;
                float odotettu = (Time.unscaledTime - odotusAlkoi) * 1000f;
                var puuttuu = Puuttuu();
                if (puuttuu != null && odotettu < ValmisOdotusMs) return;
                kaynnistetty = true;
                Kaynnista(odotettu, puuttuu == null ? "kaikki valmiina" : "ei valmiina: " + puuttuu);
            }
            Tarkista();
            if (!kaynnistetty)
                ajastimet.Add(Ajastin.Execute(Tarkista).Every(10).Until(() => kaynnistetty || !kaynnissa || oma != kerta));
        }

        void KuunteleAlkua(Puhe puhe, Action<float> alkoiViiveella)
        {
            LopetaKuuntelu();
            if (puhe == null) return;
            puheKuunneltu = puhe;
            puheAlkoi = nyt =>
            {
                if (!nyt || !kaynnissa) return;
                var p = puheKuunneltu;
                LopetaKuuntelu();
                float viive = p != null ? p.AlkuViive : 0f;
                Debug.Log($"MATKAKIRJA ui saapuminen: aloitusintro {kaupunki} William alkaa {Time.unscaledTime + viive:0.000} (dsp {AudioSettings.dspTime + viive:0.000}, esilämmitys {viive:0.0} s)");
                Aanisoitin.SaapumisPuheAlkoi(kaupunki, viive);
                alkoiViiveella?.Invoke(viive);
            };
            puhe.Puhuu += puheAlkoi;
        }

        void LopetaKuuntelu()
        {
            if (puheKuunneltu != null && puheAlkoi != null) puheKuunneltu.Puhuu -= puheAlkoi;
            puheKuunneltu = null;
            puheAlkoi = null;
        }

        void Vahdi()
        {
            var o = PeliOhjain.Instanssi;
            if (kaynnissa && pelista && o != null && o.Tila != SilmukanTila.Traileri && Time.unscaledTime - alkoi > 0.5f) Lopeta(true);
        }

        void Ajasta(int ms, Action a) => ajastimet.Add(Ajastin.Execute(a).StartingIn(ms));

        /// <summary>Loppu (18 s) tai Ohita: kerros pois, William seis (Ohita), musiikki jatkuu kaupungin kappaleeseen, valmis kerran.</summary>
        public void Lopeta(bool ohitettu)
        {
            if (!kaynnissa) return;
            kaynnissa = false;
            kerta++;
            LopetaKuuntelu();
            foreach (var a in ajastimet) a.Pause();
            ajastimet.Clear();
            Debug.Log($"MATKAKIRJA ui saapuminen: aloitusintro {kaupunki} päättyi {Time.unscaledTime:0.000} ({Time.unscaledTime - alkoi:0.00} s{(ohitettu ? ", ohitettu" : "")}, kuvia {esitys.Kuvia})");
            if (ohitettu)
            {
                var p = Puhe.Instanssi;
                if (p != null && p.SoivaUrl != null && p.SoivaUrl.Contains("/kaupunki-intro-")) p.Pysayta(0.2f);
                if (musiikkiKatko) Aanisoitin.Instanssi?.KaupunkiIntroOhita();
            }
            // William ei ehtinyt alkaa: odottava nopea ei jää odottamaan. Korotus pois (nopea laskee tavalliselle tasolle 3 s:ssä).
            Aanisoitin.SaapumisMusiikkiVapaa(kaupunki);
            Aanisoitin.EsitysMusiikkiLoppui(ohitettu ? "aloitusintro ohitettu" : "aloitusintro loppui");
            esitys.Lopeta(ohitettu);
            pelista = false;
            var v = valmis;
            valmis = null;
            v?.Invoke(ohitettu);
        }
    }
}
