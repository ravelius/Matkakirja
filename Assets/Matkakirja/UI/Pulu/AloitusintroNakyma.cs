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
        readonly Introesitys esitys;
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

        public AloitusintroNakyma(Introesitys esitys)
        {
            this.esitys = esitys;
        }

        static IVisualElementScheduler Ajastin => UiKerros.Hae().Juuri(Introesitys.Kerros).schedule;

        /// <summary>
        /// PeliOhjaimen kutsu (PeliNakymat.Aloitusintro): intro alkaa; kunValmis(ohitettu) kerran. Vahtii pelin tilaa (Traileri),
        /// kuten saapumistraileri. Ei introa tai kuvia = valmis heti (ohitettu = false).
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
            UiSisalto.Lataa(() =>
            {
                if (oma != kerta || !kaynnissa) return;
                var kt = UiSisalto.Kaupunki(kaupunki);
                var kuvat = KaupunkiIntro.AloitusKuvaOsoitteet(kaupunki, kt?.Avauskuvat.Select(x => x.Tiedosto).ToList(),
                    kt?.Kansikuvat.Select(x => x.Tiedosto).ToList());
                int avaus = kt?.Avauskuvat.Count ?? 0;
                Debug.Log($"MATKAKIRJA ui saapuminen: aloitusintro {kaupunki} kuvat {kuvat.Count} (avauskuvia {avaus}, kansikuvia {kt?.Kansikuvat.Count ?? 0}): "
                          + string.Join(" | ", kuvat.Select(x => System.IO.Path.GetFileName(x ?? ""))));
                Aloita(data, kt, kuvat, oma);
            });
        }

        void Aloita(KaupunkiIntro.Aloitus data, KaupunkiTiedot kt, List<string> kuvat, int oma)
        {
            esitys.Aloita("aloitusintro " + kaupunki, () => Lopeta(true));
            // Vahti: peli ohitti (testikomento ohita-traileri, uusi matka) → intro pois.
            ajastimet.Add(Ajastin.Execute(Vahdi).Every(250));
            // Musiikki: esiladattu nopea odottaa Williamia (AaniTila.NopeaOdottaaPuhetta); QA:ssa nopea alusta, jos kaupungissa.
            var aani = Aanisoitin.Instanssi;
            bool odottaa = aani?.Tila?.OdottaaPuhetta == kaupunki;
            bool qaMusiikki = false;
            if (!pelista && !odottaa && aani?.Tila != null) qaMusiikki = aani.Tila.JaksonEsitysAlusta(kaupunki);
            // Katko + kaupungin oma kappale intron lopussa (vain jos nopea soi tai on tulossa ja omaa kappaletta on).
            musiikkiKatko = aani?.Tila != null && (odottaa || qaMusiikki || aani.Tila.Jakso == kaupunki + ":nopea") && aani.Tila.JaksollaHidas(kaupunki);
            if (musiikkiKatko) aani.KaupunkiIntro(kaupunki, KaupunkiIntro.AloitusKatkoS, KaupunkiIntro.AloitusHaivytysS, KaupunkiIntro.AloitusHidasS);
            Debug.Log($"MATKAKIRJA ui saapuminen: aloitusintro {kaupunki} alkaa {Time.unscaledTime:0.000} ({(pelista ? "saapuminen" : "QA")}, "
                      + $"musiikki {(odottaa ? "esiladattu odottaa" : qaMusiikki ? "QA alusta" : aani?.Tila?.Jakso ?? "ei jaksoa")}, "
                      + $"jatko {(musiikkiKatko ? "katko 18 s → kaupungin kappale" : "nopea jatkuu")}, William {data.WilliamUrl})");

            void Kaynnista()
            {
                if (oma != kerta || !kaynnissa) return;
                alkoi = Time.unscaledTime;
                // Kuvat 3 s välein (KaupunkiIntro.AloitusKuva); nimi ja iskulause Williamin puheen ajan.
                for (int i = 0; i < KaupunkiIntro.AloitusKuvia && i < kuvat.Count; i++)
                {
                    var kuva = kuvat[i];
                    int n = i + 1;
                    Ajasta((int)(KaupunkiIntro.AloitusKuvaAlkaa(i) * 1000), () =>
                    {
                        Debug.Log($"MATKAKIRJA ui saapuminen: aloitusintro {kaupunki} kuva {n} {Time.unscaledTime:0.000} (intron alusta {Time.unscaledTime - alkoi:0.00} s)");
                        esitys.Kuva(kuva, kaupunki + " " + n);
                    });
                }
                esitys.Nimi(kt?.Nimi ?? kaupunki, kt?.Iskulause);
                Ajasta((int)(KaupunkiIntro.AloitusNimiPoisS * 1000), esitys.NimiPois);
                Ajasta((int)(KaupunkiIntro.AloitusKestoS * 1000), () => Lopeta(false));
                // William: Puhe.Puhuu = sama ruutu kuin Play → nopea samaan hetkeen (Bluetooth-esilämmitys mukaan).
                var puhe = Puhe.Hae();
                KuunteleAlkua(puhe);
                if (puhe == null || !puhe.Soita(data.WilliamUrl, 0, () => Debug.Log($"MATKAKIRJA ui saapuminen: aloitusintro {kaupunki} William loppui {Time.unscaledTime:0.000} (intron alusta {Time.unscaledTime - alkoi:0.00} s)")))
                {
                    LopetaKuuntelu();
                    Debug.Log($"MATKAKIRJA ui saapuminen: aloitusintro {kaupunki} William ei soi (kertoja pois tai ei puhetta), musiikki intron alusta {Time.unscaledTime:0.000}");
                    Aanisoitin.SaapumisPuheAlkoi(kaupunki);
                }
            }

            // Ensimmäinen kuva heti; muu ohjelma odottaa esiladattua musiikkia enintään 1 s (kuten saapumistraileri).
            if (!odottaa || Aanisoitin.EsitysMusiikkiValmis(kaupunki)) { Kaynnista(); return; }
            bool kaynnistetty = false;
            float odotusAlkoi = Time.unscaledTime;
            ajastimet.Add(Ajastin.Execute(() =>
            {
                if (kaynnistetty || !kaynnissa || oma != kerta) return;
                float odotettu = (Time.unscaledTime - odotusAlkoi) * 1000f;
                bool valmisNyt = Aanisoitin.EsitysMusiikkiValmis(kaupunki);
                if (!valmisNyt && odotettu < KaupunkiIntro.AloitusMusiikkiOdotusS * 1000) return;
                kaynnistetty = true;
                Debug.Log($"MATKAKIRJA ui saapuminen: aloitusintro {kaupunki} odotti musiikkia {odotettu:0} ms ({(valmisNyt ? "valmis" : "ei valmis, alkaa ilman")})");
                Kaynnista();
            }).Every(10).Until(() => kaynnistetty || !kaynnissa || oma != kerta));
        }

        void KuunteleAlkua(Puhe puhe)
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
                Debug.Log($"MATKAKIRJA ui saapuminen: aloitusintro {kaupunki} William alkaa {Time.unscaledTime + viive:0.000} (dsp {AudioSettings.dspTime + viive:0.000}, esilämmitys {viive:0.0} s, intron alusta {Time.unscaledTime + viive - alkoi:0.00} s)");
                Aanisoitin.SaapumisPuheAlkoi(kaupunki, viive);
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
