<template>
  <div id="app">
    <div class="root">
      <header>
        <a href="https://tamius.net">tamius.net</a> — Results of Sprout's survey
      </header>
      <div class="content">
        <h1>HTTYD survey results</h1>
        <p>
          In February 2020, /u/TheBrusselSprout posted a <a href="https://www.reddit.com/r/httyd/comments/f4mlpo/httyd_franchise_survey/">survey</a>, which asked people about their opinion about the franchise.
        </p>
        <p>
          Because pictures of graphs are boring, I decided to spice them up ever so slightly by making them interactive.
        </p>
        <p>
          Side notes for users of anything that's not firefox: I've been made aware that radial graphs lack
          black outlines around the bars. I'm gonna pull a bethesda here because I don't plan to do anything about it. Consider using a better browser.
        </p>
        <p>
          There's quite some svg graphs and javascript that handle data on this page. Expect slowdowns.
        </p>
      </div>
      <div id="filter-root" class="flex-column">
        <div class="category-break" :class="{'expanded': ses.filters, 'collapsed': !ses.filters}" @click="toggleItem('filters')">
          <SplatterBg>Filter</SplatterBg>
        </div>
        <template v-if="ses.filters">
          <div class="flex-column">
            <div class="content">
              <p>
                Select categories to enable filtering in said categories. Filtering by multiple options within a single groups is done with OR. Filtering with multiple selected groups is done with AND.
              </p>
            </div>
            <div class="filter w100">
              <FilterCategory categoryName="Demographics"
                              :enabledFilters="enabledFilters"
                              :showWarning="['platform', 'age', 'fandomTime']"
              >
                <FilterGroup class="filter-col" groupName="Platform" v-model="enabledFilters.platform">
                  <MultipleSelect v-model="filters.platform"
                                  :options="filterOptions.platform"
                                  @setEnabled="enabledFilters.platform = $event"
                  >
                  </MultipleSelect>
                </FilterGroup>
                <FilterGroup class="filter-col" groupName="Age group" v-model="enabledFilters.age">
                  <MultipleSelect v-model="filters.age"
                                  :options="filterOptions.age"
                                  @setEnabled="enabledFilters.age = $event"
                  >
                  </MultipleSelect>
                </FilterGroup>
                <FilterGroup class="filter-col" groupName="Fandom time" v-model="enabledFilters.fandomTime">
                  <MultipleSelect v-model="filters.fandomTime"
                                  :options="filterOptions.fandomTime"
                                  @setEnabled="enabledFilters.fandomTime = $event"
                  >
                  </MultipleSelect>
                </FilterGroup>
              </FilterCategory>

              <FilterCategory categoryName="Movies"
                              :enabledFilters="enabledFilters"
                              :showWarning="['ranking', 'rating1', 'rating2', 'rating3', 'weak1', 'weak2', 'weak3', 'strong1', 'strong2', 'strong3' ]"
              >
                
                <div class="flex-row flex-center">
                  <FilterGroup class="filter-col" groupName="Movie ranking" v-model="enabledFilters.ranking">
                    <MultipleSelect v-model="filters.ranking"
                                    :options="filterOptions.ranking"
                                    @setEnabled="enabledFilters.ranking = $event"
                    >
                    </MultipleSelect>
                  </FilterGroup>
                </div>

                <FilterCategory class="w100" categoryName="HTTYD 1" :subcategory="true"
                                :enabledFilters="enabledFilters"
                                :showWarning="['rating1', 'weak1', 'strong1']"
                >
                  <FilterGroup class="filter-col" groupName="Rating" :value="enabledFilters.rating1">
                    <div class="filter-toggle"
                        :class="{'checked': enabledFilters.rating1}"
                        @click="toggleFilter('rating1')"
                    >
                      {{enabledFilters.rating1 ? 'Enabled' : 'Enable filter' }}
                    </div>
                    <div class="filter-box" :class="{'disabled': !enabledFilters.rating1}">
                      Minimum:
                      <ScoreSlider v-model="filters.rating1Min" :min="1" :max="10"></ScoreSlider>
                      Maximum:
                      <ScoreSlider v-model="filters.rating1Max" :min="1" :max="10"></ScoreSlider>
                    </div>
                  </FilterGroup>
                  <FilterGroup class="filter-col" groupName="Strongest points" v-model="enabledFilters.strong1">
                    <MultipleSelect v-model="filters.strong1"
                                    :options="filterOptions.strongPoints"
                                    @setEnabled="enabledFilters.strong1 = $event"

                    >
                    </MultipleSelect>
                  </FilterGroup>
                  <FilterGroup class="filter-col" groupName="Weakest points — HTTYD 1" v-model="enabledFilters.weak1">
                    <MultipleSelect v-model="filters.weak1"
                                    :options="filterOptions.strongPoints"
                                    @setEnabled="enabledFilters.weak1 = $event"
                    >
                    </MultipleSelect>
                  </FilterGroup>
                </FilterCategory>


                <FilterCategory class="w100" categoryName="HTTYD 2" :subcategory="true"
                                :enabledFilters="enabledFilters"
                                :showWarning="['rating2', 'weak2', 'strong2']"
                >
                  <FilterGroup class="filter-col" groupName="HTTYD 2 rating" v-model="enabledFilters.rating2">
                    <div class="filter-toggle"
                        :class="{'checked': enabledFilters.rating2}"
                        @click="toggleFilter('rating2')"
                    >
                      {{enabledFilters.rating2 ? 'Enabled' : 'Enable filter' }}
                    </div>
                    <div class="filter-box" :class="{'disabled': !enabledFilters.rating2}">
                      Minimum:
                      <ScoreSlider v-model="filters.rating2Min" :min="1" :max="10"></ScoreSlider>
                      Maximum:
                      <ScoreSlider v-model="filters.rating2Max" :min="1" :max="10"></ScoreSlider>
                    </div>
                  </FilterGroup>
                  <FilterGroup class="filter-col" groupName="Strongest points — HTTYD 2" v-model="enabledFilters.strong2">
                    <MultipleSelect v-model="filters.strong2"
                                    :options="filterOptions.strongPoints"
                                    @setEnabled="enabledFilters.strong2 = $event"
                    >
                    </MultipleSelect>
                  </FilterGroup>
                  <FilterGroup class="filter-col" groupName="Weakest points — HTTYD 2" v-model="enabledFilters.weak2">
                    <MultipleSelect v-model="filters.weak2"
                                    :options="filterOptions.strongPoints"
                                    @setEnabled="enabledFilters.weak2 = $event"
                    >
                    </MultipleSelect>
                  </FilterGroup>
                </FilterCategory>

                <FilterCategory class="w100" categoryName="The Hidden World" :subcategory="true"
                                :enabledFilters="enabledFilters"
                                :showWarning="['rating3', 'weak3', 'strong3']"
                >
                  <FilterGroup class="filter-col" groupName="The Hidden World rating" v-model="enabledFilters.rating3">
                    <div class="filter-toggle"
                        :class="{'checked': enabledFilters.rating3}"
                        @click="toggleFilter('rating3')"
                    >
                      {{enabledFilters.rating3 ? 'Enabled' : 'Enable filter' }}
                    </div>
                    <div class="filter-box" :class="{'disabled': !enabledFilters.rating3}">
                      Minimum:
                      <ScoreSlider v-model="filters.rating3Min" :min="1" :max="10"></ScoreSlider>
                      Maximum:
                      <ScoreSlider v-model="filters.rating3Max" :min="1" :max="10"></ScoreSlider>
                    </div>
                  </FilterGroup>
                  <FilterGroup class="filter-col" groupName="Strongest points — THW" v-model="enabledFilters.strong3">
                    <MultipleSelect v-model="filters.strong3"
                                    :options="filterOptions.strongPoints"
                                    @setEnabled="enabledFilters.strong3 = $event"
                    >
                    </MultipleSelect>
                  </FilterGroup>
                  <FilterGroup class="filter-col" groupName="Weakest points — THW" v-model="enabledFilters.weak3">
                    <MultipleSelect v-model="filters.weak3"
                                    :options="filterOptions.strongPoints"
                                    @setEnabled="enabledFilters.weak3 = $event"
                    >
                    </MultipleSelect>
                  </FilterGroup>
                </FilterCategory>

                <FilterCategory class="w100" categoryName="THW — extras" :subcategory="true"
                                :enabledFilters="enabledFilters"
                                :showWarning="['ratingThotfury', 'ratingThwEnding', 'betterIfNot']"
                >
                  <FilterGroup class="filter-col" groupName="Thotfury is likable and interesting" v-model="enabledFilters.ratingThotfury">
                    <div class="filter-toggle"
                        :class="{'checked': enabledFilters.ratingThotfury}"
                        @click="toggleFilter('ratingThotfury')"
                    >
                      {{enabledFilters.ratingThotfury ? 'Enabled' : 'Enable filter' }}
                    </div>
                    <div class="filter-box" :class="{'disabled': !enabledFilters.ratingThotfury}">
                      Minimum:
                      <ScoreSlider v-model="filters.ratingThotfuryMin" :min="1" :max="10"></ScoreSlider>
                      Maximum:
                      <ScoreSlider v-model="filters.ratingThotfuryMax" :min="1" :max="10"></ScoreSlider>
                    </div>
                  </FilterGroup>
                  <FilterGroup class="filter-col" groupName="THW was a fitting end to franchise" v-model="enabledFilters.ratingThwEnding">
                    <div class="filter-toggle"
                        :class="{'checked': enabledFilters.ratingThwEnding}"
                        @click="toggleFilter('ratingThwEnding')"
                    >
                      {{enabledFilters.ratingThwEnding ? 'Enabled' : 'Enable filter' }}
                    </div>
                      <div class="filter-box" :class="{'disabled': !enabledFilters.ratingThwEnding}">
                      Minimum:
                      <ScoreSlider v-model="filters.ratingThwEndingMin" :min="1" :max="10"></ScoreSlider>
                      Maximum:
                      <ScoreSlider v-model="filters.ratingThwEndingMax" :min="1" :max="10"></ScoreSlider>
                    </div>
                  </FilterGroup>
                  <FilterGroup class="filter-col" groupName="Better if wasn't in franchise" v-model="enabledFilters.betterIfNot">
                    <MultipleSelect v-model="filters.betterIfNot"
                                    :options="filterOptions.betterIfNot"
                                    @setEnabled="enabledFilters.betterIfNot = $event"
                    >
                    </MultipleSelect>
                  </FilterGroup>
                </FilterCategory>
              </FilterCategory>

              <FilterCategory categoryName="TV series"
                              :enabledFilters="enabledFilters"
                              :showWarning="['watchedSeries', 'ratingRDoB', 'ratingRttE']"
              >
                <FilterGroup class="filter-col" groupName="Has watched series" v-model="enabledFilters.watchedSeries">
                  <MultipleSelect v-model="filters.watchedSeries"
                                  :options="filterOptions.watchedSeries"
                                  @setEnabled="enabledFilters.watchedSeries = $event"
                  >
                  </MultipleSelect>
                </FilterGroup>
                <FilterGroup class="filter-col" groupName="Riders/Defenders of berk ratings" v-model="enabledFilters.ratingRDoB">
                  <div class="filter-toggle"
                        :class="{'checked': enabledFilters.ratingRDoB}"
                        @click="toggleFilter('ratingRDoB')"
                  >
                    {{enabledFilters.ratingRDoB ? 'Enabled' : 'Enable filter' }}
                  </div>
                  <div class="filter-box" :class="{'disabled': !enabledFilters.ratingRDoB}">
                    Minimum:
                    <ScoreSlider v-model="filters.ratingRDoBMin" :min="1" :max="10"></ScoreSlider>
                    Maximum:
                    <ScoreSlider v-model="filters.ratingRDoBMax" :min="1" :max="10"></ScoreSlider>
                  </div>
                </FilterGroup>
                <FilterGroup class="filter-col" groupName="Race to the Edge ratings" v-model="enabledFilters.ratingRttE">
                  <div class="filter-toggle"
                        :class="{'checked': enabledFilters.ratingRttE}"
                        @click="toggleFilter('ratingRttE')"
                  >
                    {{enabledFilters.ratingRttE ? 'Enabled' : 'Enable filter' }}
                  </div>
                  <div class="filter-box" :class="{'disabled': !enabledFilters.ratingRttE}">
                    Race to the Edge (min):
                    <ScoreSlider v-model="filters.ratingRttEMin" :min="1" :max="10"></ScoreSlider>
                    Race to the Edge (max):
                    <ScoreSlider v-model="filters.ratingRttEMax" :min="1" :max="10"></ScoreSlider>
                  </div>
                </FilterGroup>
              </FilterCategory>
            </div>

            <div class="center button-row">
              <a class="button" @click="processData()">
                <b>APPLY FILTER</b>
              </a><br/><br/>
              <a v-if="showFluffText" class="button" @click="showFluff(false)">
                <small>Hide fluff text</small>
              </a>
              <a v-if="!showFluffText" class="button" @click="showFluff(true)">
                <small>Show category explainer text</small>
              </a>
            </div>
          </div>
        </template>
      </div>

      <!-- NOTE: this template is here just to make collapsing code easier. It's not supposed to have any v-ifs or v-fors on it -->
      <template> 
        <div class="category-break" :class="{'expanded': ses.demographics, 'collapsed': !ses.demographics}" @click="toggleItem('demographics')">
          <SplatterBg>Community breakdown</SplatterBg>
        </div>
        <template v-if="ses.demographics">
          <div class="content">
            <template v-if="ees.demographics">
              <p>
                Not only are there multiple communities dedicated to HTTYD on the internet, the first movie was released about a decade ago. This means the fan demographics has lots of potential for diversity in age department, especially since the movies (the first two more so than the last, courtesy of Dreamworks-Universal/Comcast merger) were targeted at wide demographics.
              </p> 
              <p>
                Let's see how fragmented the fandom is. Later down the line, this data could also allow us to see whether there are any noticeable differences between various platforms, ages and years spent in the fandom.
              </p>
              <p>
                There are a few caveats with this category: 'age' and 'fandom time' questions were not on the poll since the beginning, so early responders (mostly from main discord) couldn't provide their answers. Similar thing happened with platforms, where 'other' didn't always include 'please specify' follow-up (although by the time free platform entry option was added, responses from 'Other' barely broke into early teens), and a few other things that will be addressed in analyst at the very end.
              </p>
              <div class="section-toggle" @click="ees.demographics = false">Show less ...</div>
            </template>
            <template v-else>
              <div class="section-toggle" @click="ees.demographics = true">Show category description ...</div>
            </template>
          </div>
          <div class="chart-area-fullwidth">
            <div class="center total-responses w100">
              <span class="im-fell-sc"><b>Total responses:</b> {{responseCount}}</span><br/>
              <span v-if="responseCount != dataRows.length" class="im-fell"><small><small>Total, unfiltered: {{dataRows.length}}</small></small></span>
            </div>
            <div class="chart-box">
              <h3>Platform</h3>
              <VueApexCharts type="radialBar" height="390" :options="chartOptions.platform" :series="chartData.platform"></VueApexCharts>
            </div>
            <div class="chart-box">
              <h3>Age</h3>
              <VueApexCharts type="bar" height="390" :options="chartOptions.age" :series="chartData.age"></VueApexCharts>
            </div>
            <div class="chart-box">
              <h3>Fandom time</h3>
              <VueApexCharts type="bar" height="390" :options="chartOptions.fandomTime" :series="chartData.fandomTime"></VueApexCharts>
            </div>
          </div>
        </template>

        <!-- ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————— -->

        <div class="category-break" :class="{'expanded': ses.movies, 'collapsed': !ses.movies}" @click="toggleItem('movies')">
          <SplatterBg>Movie ratings</SplatterBg>
        </div>
        <template v-if="ses.movies">
          <div class="content">
            <template v-if="ees.movies">
              <p>
                The meat of the poll. We asked people to rank movies from their favourite to their least favourite, rate them on the scale from 1-10 and pick strongest and weakest aspect for every movie. Pretty straightforward. Because averages don't tell the entire story, the graphs below show both average ratings and rating distributions.
              </p>
              <p>
                There were some criticisms of 'strongest'/'weakest' point question. 'Pacing' could be an option, 'Animation/Graphics' shouldn't be combined with 'score.' There have also been criticisms regarding 'strongest' and 'weakest' point being pick-one kind of deal a bit suboptimal, with some movies lacking an obvious 'weakest' and others lacking obvious 'strongest' point (and in the middle there's also the case of having nothing discernably better or worse than the other options). But at the end of the day, we believe that the question works well enough as a quick rule of a thumb (and it also forcibly avoids cop-out answers, where people would just put everything as a strong/weak point).
              </p>
              <p>
                Special thanks to Brussel for <i>not</i> providing "cop-out" options (the ones that include equality operator at some point) because would please anyone think of the poor person who'd have to handle 24 options for a single chart. And for making ratings go 1-10 instead of 0-10. 
              </p>
              <div class="section-toggle" @click="ees.movies = false">Show less ...</div>
            </template>
            <template v-else>
              <div class="section-toggle" @click="ees.movies = false">Show category description ...</div>
            </template>
          </div>
          <div class="chart-area-fullwidth reverse-wrap">
            <!-- 
              We do reverse wrap to ensure 'strongest aspect' and 'weakest aspect' are always on the same line
              (unless the screen is too narrow to display two charts at the same time)
            -->
            <div class="chart-box">
              <h3>Weakest aspect</h3>
              <VueApexCharts type="bar" height="390" :options="chartOptions.strongestWeakest" :series="chartData.weakest"></VueApexCharts>
            </div>
            <div class="chart-box">
              <h3>Strongest aspect</h3>
              <VueApexCharts type="bar" height="390" :options="chartOptions.strongestWeakest" :series="chartData.strongest"></VueApexCharts>
            </div>
            <div class="chart-box">
              <h3>Rating distribution</h3>
              <VueApexCharts type="bar" height="390" :options="chartOptions.movieRatingDistributionOptions" :series="chartData.movieRatings"></VueApexCharts>
            </div>
            <div class="chart-box">
              <h3>Average ratings</h3>
              <VueApexCharts type="radialBar" height="390" :options="chartOptions.movieRatingsAvgOptions" :series="chartData.movieRatingsAvg"></VueApexCharts>
            </div>
            <div class="chart-box">
              <h3>Ranking</h3>
              <VueApexCharts class="donut-chart" type="donut" height="390" :options="chartOptions.ranking" :series="chartData.ranking"></VueApexCharts>
            </div>
          </div>
        </template>

        <!-- ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————— -->
        
        <div class="category-break" :class="{'expanded': ses.series, 'collapsed': !ses.series}" @click="toggleItem('series')">
          <SplatterBg>Series ratings</SplatterBg>
        </div>
        <template v-if="ses.series">
          <div class="content">
            <template v-if="ees.series">
              <p>
                Same thing as before, but with spinoff series. 'Has seen series' graph is autogenerated — it is assumed that people who didn't rate the series on the scale from 1 to 10 haven't watched them.
              </p>
              <div class="section-toggle" @click="ees.series = false">Show less ...</div>
            </template>
            <template v-else>
              <div class="section-toggle" @click="ees.series = true">Show category description ...</div>
            </template>
          </div>
          <div class="chart-area-fullwidth">
            <div class="chart-box">
              <h3>Has seen series?</h3>
              <VueApexCharts type="radialBar" height="390" :options="chartOptions.seriesRatingsAvgOptions" :series="chartData.seriesViewership"></VueApexCharts>
            </div>
            <div class="chart-box">
              <h3>Average ratings</h3>
              <VueApexCharts type="radialBar" height="390" :options="chartOptions.seriesRatingsAvgOptions" :series="chartData.seriesRatingsAvg"></VueApexCharts>
            </div>
            <div class="chart-box">
              <h3>Rating distribution</h3>
              <VueApexCharts type="bar" height="390" :options="chartOptions.seriesRatingDistributionOptions" :series="chartData.seriesRatings"></VueApexCharts>
            </div>
          </div>
        </template>

        <!-- ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————— -->

        <div class="category-break" :class="{'expanded': ses.thwExtras, 'collapsed': !ses.thwExtras}" @click="toggleItem('thwExtras')">
          <SplatterBg>The Hidden World opinion corner</SplatterBg>
        </div>
        <template v-if="ses.thwExtras">
          <div class="content">
            <template v-if="ees.thwExtras">
              <p>
                There have been some accusations that the question in this settings are some major soapboaxing, when in fact there is a clear rationale behind them.
              </p>
              <ul>
                <li>
                  <b>Light fury is a likable and relatable character (1-10):</b> There is a certain segment of people who <i>really</i> don't like Light Fury. We're not talking "I'll give that a 5 because I've got no hard feelings either way" kind of neutral position or "her design is kinda bad and uninspired with little to no character." We're talking ... worse. But are those opinions of nearly everyone or just a vocal minority? Time to hit the pulse-o-meter.
                </li>
                <li>
                  <b>The Hidden World is a fitting end to the franchise (1-10):</b> The first two movies promoted accepting differences, tolerance, unity, and fighting for what is right; with third movie seemingly contradicting everything we've seen in the previous two. 
                  With a <a href="https://stuff.tamius.net/httyd3">small host of very extensive reviews</a> ripping The Hidden World a new one due to its apparent contradictions of the previous two movies versus <a href="https://www.youtube.com/watch?v=CAADd9TpeR8" target="_blank">rarest of them writeups explaining how THW doesn't contradict itself</a>, we decided to cast our nets a little bit wider ...
                </li>
                <li>
                  <b>The Hidden World would have been a significantly better film if it was not part of the HTTYD franchise:</b> This question could be phrased a bit better, but by this point you know the drill. Be me, open discord and reddit, see people saying things about <i>The Hidden World</i>. Specifically, they're saying that is not a bad movie if you forget that the rest of the franchise exists,
                  but that the first two movies bring some "baggage" that makes the third movie weaker than it would otherwise be. The question was intended to test the prevalence of this sentiment in the community. Unanswered instances of this question are counted under 'neither.'
                </li>
              </ul>
              <p>
                Some might ask: "hey, isn't this last question just <i>'does THW suck?'</i> with a dask of <i>'is THW a fitting end to the franchise?'</i> The answer is no, no it's not. Or maybe it is, if you have a high opinion of whether THW is a good movie or a fitting end to the trilogy. If you're the kind of person with unfavorable view of THW and don't consider ending to be fitting for the franchise, though, this question starts to carry more nuance
                as it offers a mild amount of additional nuance about where the reason for said unfavorable view lies. For example a person who voted 1/10 for the overall score, 1/10 for whether THW is a fitting end to the franchise and 'agree' to this last question could be interpreted as saying "THW is garbage and it doesn't fit the ending, but I'd maybe view it better without the baggage of the previous movies."
                On the other hand, person who voted 1/10 for the overall score, 1/10 for whether THW is a fitting end to the franchise and 'disagree' to this last question could be interpreted as saying "THW sucks, but not because it's a movie that doesn't fit its franchise — it's issues run deeper."
              </p>
              <div class="section-toggle" @click="ees.thwExtras = false">Show less ...</div>
            </template>
            <template v-else>
              <div class="section-toggle" @click="ees.thwExtras = true">Show category description ...</div>
            </template>
          </div>
          <div class="chart-area-fullwidth">
            <div class="chart-box">
              <h3>Average ratings</h3>
              <VueApexCharts type="radialBar" height="390" :options="chartOptions.thotfuryEndingRatingsAvgOptions" :series="chartData.thotfuryEndingRatingsAvg"></VueApexCharts>
            </div>
            <div class="chart-box">
              <h3>Rating distribution</h3>
              <VueApexCharts type="bar" height="390" :options="chartOptions.thotfuryEndingRatingDistributionOptions" :series="chartData.thotfuryEndingRatings"></VueApexCharts>
            </div>
            <div class="chart-box">
              <h3>THW would be better if it wasn't part of the franchise</h3>
              <VueApexCharts class="donut-chart" type="donut" height="390" :options="chartOptions.betterIfNotOptions" :series="chartData.betterIfNot"></VueApexCharts>
            </div>
          </div>
        </template>

        <!-- ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————— -->

        
        <!-- ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————— -->

        <div id="filter-trigger" class="category-break" :class="{'expanded': ses.analystDesk, 'collapsed': !ses.analystDesk}" @click="toggleItem('analystDesk')">
          <SplatterBg>Back to the analyst desk</SplatterBg>
        </div>        
        <template v-if="ses.analystDesk">
          <div class="content">
            <p >
              Congratulations! That's been all the raw data and charts for the day. You can stay for a while longer for some additional analysis. You can take this cookie and scroll up and play with the filters without my soapboxing. Also don't tell auntie EU that I gave you that cookie.
            </p>
          </div>
          <div class="content">

            <h2>"Best" versus "I like it most"</h2>
            <p>The writing of The Hidden World is objectively bad in so many ways, but that doesn't stop people from liking or enjoying the movie, because let's be honest: the movie does provide a certain amount of mindless entertainment and it manages to hold together well enough — just as long as you don't think about it too much.</p>
            <p>As soon as results started to roll in, I started to wonder whether anyone will be able to separate their enjoyment of the movie from whether the movie is good or not. The results are in and — yes. Even before the polling ended, the worst ratings for The Hidden World by people who ranked The Hidden World first was far below the worst rantings for The Hidden World:</p>
            <div class="w100 center">
              <img src='./assets/graphs/ranking-vs-rating.svg' /><br/>
              <p><small>
                This is 1/10 rating distribution for all three movies at 300th vote, filtered only by people who ranked The Hidden World above the other two. But even though everyone in this graph preferred THW to the other two, four (24%) of THW ratings place well below the worst rating of HTTYD1 or 2.
              </small></p>
            </div>
            <p>But these four cases are only the ones that are easiest to see. Overall, there's {{extraStatistics.favNotBest}} ({{ (extraStatistics.favNotBest/dataRows.length * 100).toFixed(2)}}%) cases of people indicating they prefer a movie they deemed worse than the others. It's clear that some of you recognize that liking something the most doesn't mean must be the best and vice versa. This is a rare line of thinking and it deserves a special commendation.</p>




            
          </div>
        </template>

        <div class="category-break" :class="{'expanded': ses.audit, 'collapsed': !ses.audit}" @click="toggleItem('audit')">
          <SplatterBg>The Auditioning</SplatterBg>
        </div>
        <template v-if="ses.audit">
          <div class="content">
            <p>There are a few other things that I want to get out of the way: a few disclaimers, raw data, and code.</p>

            <h2>Data collection asterisks</h2>

            <p>Nothing on this page is hand processed. I wrote a program that gets Brussel's answer spreadsheet and throws it into graphs without me having to hand pick every answer.</p>
            <p>But most notably, there's a few things to be said about platform statistics. I know I should probably tell Brussel to make sure to note that "other" box should contain a single platform with zero essays added, because unfiltered user input is how you get plenty of headaches.</p>
            <p>For example, the following would count as 'instagram:'</p>
            <code>tumblr lol. why are the options just discord or reddit. there’s ppl on tumblr and Instagram and the Berk vine message boards and probably twitter </code>
            <p>because in the sane world, people would answer just "tubmlr" or just "instagram" (and they would also be literate) and the code was written to reflect that. It first checks whether the answer contains 'insta.' If it does, the user answered with 'insta' or 'instagram'. If it doesn't, we check whether the user answered with 'tumblr.'</p>
            <p>But nope. Of course the lazy way isn't gonna go. SMH my head.</p>
            <p>To answer the question of <b>why only discord and reddit:</b></p>
            <ul>
              <li>Many of us aren't using normie sites</li>
              <li>Serious answer: guess who made the poll. Originally, it was mostly targeted at main discord and the subreddit. We would have included the other platforms, but there's a problem. Reddit is a equal-opportunity platform. You make a post and the only thing that determines its popularity is how good it is (with a few caveats — image based posts have a massive advantage, as they're easiest to consume). Through the magic of asking the mods of the subreddit to pin the poll post for a few days (so it stays at the top of the subreddit), you're guaranteed some exposure.<br/>
              Instagram, Twitter and Tumblr are heavily follower-based platforms. If you haven't gathered a large number of followers by producing vast amounts of content through the years, your posts are very unlikely to gain any attention at all. Here's a fun fact: none of us did that, so the working assumption was that the 'other' category will be fairly small.<br/>
              <small><b>The following opinion is mine and mine alone:</b> There are also some negative perceptions about the respective platforms: when the quickest way to build a following is to spam shitty gifs that look like a 144p youtube video from 2005 while using same bandwidth as a 4K bluray, or poorly edited images with some pseudo-inspirational cancer like <a href="https://hiccstridparadise.tumblr.com/post/188037244240/let-her-be-everything-because-she-is-everything">this stuff right here</a> (double points for shitty instagram filters) ... Well. I prefer my quality dank, and the Twitter/insta/tumblr trio doesn't deliver.</small></li>
            </ul>

            <h2>Data and code</h2>
            
            <p>Some people aren't the most trusting kind, which is far enough. Even when people don't lie to you, they're still prone to making mistakes. If you're the kind of person who wants to hunt for mistakes, we are happy to provide both raw data and the code.</p>

            <ul>
              <li><b>Raw data:</b> <a target="_blank" href="https://docs.google.com/spreadsheets/d/1qgddox_aheEegSoGKyLCYqUGUbBH3ItG7jvH9EWgKYM/edit?usp=sharing">gsheets</a></li>
              <li><small>Data as compiled by Brussel: <a target="_blank" href="https://docs.google.com/spreadsheets/d/16pQmMwL0skub9teoMsND7Uv2n-cB1Ifp6QAZEcHM8PA/edit?usp=sharing">gsheets</a></small></li>
              <li><b>Source:</b> <a target="_blank" href="https://github.com/xternal7/sprout-httyd-survey">github</a></li>
            </ul>
          </div>
        </template>

        <div class="category-break" :class="{'expanded': ses.specialThanks, 'collapsed': !ses.specialThanks}" @click="toggleItem('specialThanks')">
          <SplatterBg>Special thanks to</SplatterBg>
        </div>
        <template v-if="ses.specialThanks">
          <div class="content">
            <ul>
              <li><b>/u/TheBrusselSprout</b> for sharing read-only copy of raw poll data</li>
              <li><b>Vue</b> — making web development a bit less pain in the ass, one framework at the time</li>
              <li><b>Axios</b> — for this one request to Google Sheets lol</li>
              <li><b><a href="https://apexcharts.com/vue-chart-demos/" target="_blank">ApexCharts</a></b> — you know what for</li>
              <li><b><a href="https://stackoverflow.com/a/33727897/5117388" target="_blank">This one dude on StackOverflow</a></b> telling me how to get data from spreadsheet</li>
              <li><b><a href="https://meyerweb.com/eric/tools/color-blend/" target="_blank">This handy color blending tool</a></b> for generating chart colors (although I've ended up writing my own along the way)</li>
              <li><b>Other dudes from stackoverflow</b> who provided solutions to other technical issues and problems that popped up along the way</li>
              <li><b>Dreamworks</b> for not swatting me with a <a href="https://www.youtube.com/watch?v=qvM6Mg0VtO0" target="_blank">DMCA</a> ... yet (sweats bullets), because most image assets are basically blatantly taken from the HTTYD1 credit roll. Fair use pls?</li>
              <li><b>Me</b> — for writing this and paying for hosting fees</li>
            </ul>
          </div>
        </template>
      </template>
      <footer class="w100 flex-column">
        <div class="content footer">
          Congrats, you've reached bottom. There's nothing else beyond this point. No dragons. Not even wyverns.
          <br/>
          <br/>
          <b>Other HTTYD things:</b><br/>
          <a href="https://discord.gg/cXvtACn" target="_blank">Main discord</a>, <a href="https://old.reddit.com/r/httyd" target="_blank">the subreddit</a>.
          <br/>
          <br/>
          <b>Other HTTYD related stuff by me:</b><br>
          <a href="https://httydnd.tamius.net/" target="_blank">How To Train Your (Dungeons & Dragons)</a> (currently abandoned)
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import ScoreSlider from './components/ScoreSlider/ScoreSlider';
import FilterCategory from './components/FilterCategory/FilterCategory';
import FilterGroup from './components/FilterGroup/FilterGroup';
import MultipleSelect from './components/MultipleSelect/MultipleSelect';
import SplatterBg from './components/SplatterBg/SplatterBg';
import Axios from 'axios';

var Platform = Object.freeze({
  MainDiscord: 0,
  Subreddit: 1,
  OtherDiscord: 2,
  Instagram: 3,
  Tumblr: 4,
  Wikia: 5,
  Other: 6,
});

var allPlatforms = [
  { name: 'Discord (main)', value: Platform.MainDiscord },
  { name: 'Subreddit', value: Platform.Subreddit },
  { name: 'Discord (other)', value: Platform.OtherDiscord },
  { name: 'Instagram', value: Platform.Instagram },
  { name: 'Tumblr' , value: Platform.Tumblr },
  { name: 'Fandom/wikia', value: Platform.Wikia },
  { name: 'Other', value: Platform.Other },
];

var Ranking = Object.freeze({
  R123: 0,
  R132: 1,
  R213: 2,
  R231: 3,
  R312: 4,
  R321: 5,
  NotProvided: 6,
});

var StrongPoint = Object.freeze({
  Plot: 0,
  Themes: 1,
  Characters: 2,
  Emotion: 3,
  GraphicsScore: 4,
  NotProvided: 5,
});

var BetterIfNot = Object.freeze({
  Agree: 0,
  Neither: 1,
  Disagree: 2,
});

var Age = Object.freeze({
  Year1214: 0,
  Year1416: 1,
  Year1618: 2,
  Year1820: 3,
  Year20: 4,
  AgeShy: 5,
});

var FandomTime = Object.freeze({
  Year1: 0,
  Year12: 1,
  Year34: 2,
  Year5: 3,
  FandomTimeShy: 4,
});

var WatchedSeries = Object.freeze({
  No: 0,
  RDoB: 1,
  RttE: 2,
  Both: 3,
});

export default {
  name: 'App',
  components: {
    VueApexCharts,
    FilterCategory,
    FilterGroup,
    MultipleSelect,
    ScoreSlider,
    SplatterBg,
  },
  data() {
    const chartHeight = 320;

    const startColor = '#FFAA66';
    const endColor = '#22160C';

    const chartOutlieBaseColor = '#22160C';
    const baseFont = 'Overpass, Helvetica, Arial, sans-serif';

    const legendOptionsBase = {
      fontFamily: baseFont,
      color: chartOutlieBaseColor,
      markers: {
        strokeColor: chartOutlieBaseColor
      }
    }

    const gridOptionsBase = {
      borderColor: chartOutlieBaseColor,
    }

    const yAxisOptions = {
      labels: {
        style: {
          color: chartOutlieBaseColor,
          fontFamily: baseFont,
        }
      },
      axisBorder: {
        color: chartOutlieBaseColor,
      },
      axisTicks: {
        color: chartOutlieBaseColor,
      },
    }

    const radialOptionsBase = {
      chart: {
        type: 'radialBar',
        height: chartHeight,
        width: chartHeight,
        fontFamily: baseFont,
        foreColor: endColor,
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
        hover: {
          filter: {
            type: 'none',
            value: 0,
          }
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0,
          }
        },
      },
      plotOptions: {
        radialBar: {
          expandOnClick: false,
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: '50%',
            image: undefined,
          },
          track: {
            background: '#22160C',
            opacity: 0.2,
            // show: false,
          },
          dataLabels: {
            show: false,
          },
        },
      },
      fill: {
        opacity: 1,
      },
      stroke: {
        width: 0.5,
        color: chartOutlieBaseColor
      },
      dataLabels: {
        color: '#22160C'
      },
      legend: {
        show: true,
        floating: true,
        fontSize: '16px',
        position: 'left',
        // offsetX: 160,
        offsetY: 16,
        color: '#FFAA66',
        labels: {
          // useSeriesColors: true,
          color: '#FFAA66'
        },
        markers: {
          size: 0
        },
        formatter: function(seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
        },
        itemMargin: {
          horizontal: 3,
        }
      },
      // responsive: [{
      //   breakpoint: 480,
      //   options: {
      //     legend: {
      //         show: false
      //     }
      //   }
      // }]
    };

    const stackedOptionsBase = {
      chart: {
        type: 'bar',
        height: chartHeight,
        stacked: true,
        stackType: '100%',
      },
      plotOptions: {
        bar: {
          horizontal: true,
        }
      },
      stroke: {
        width: 0.5,
        colors: ['#220b01']
      },
      legend: {
        ...legendOptionsBase,
        position: 'top',
        horizontalAlign: 'center',
      },
      grid: {
        ...gridOptionsBase
      },
      yaxis: {
        ...yAxisOptions
      },
      xaxis: {
        ...yAxisOptions
      }
    };

    const donutOptionsBase = {
      chart: {
        type: 'donut',
        fontFamily: baseFont,
        foreColor: startColor,
      },
      plotOptions: {
        pie: {
          expandOnClick: false
        }
      },
      legend: {
        show: true,
        floating: true,
        fontSize: '16px',
        position: 'left',
        top: null,
        left: null,
        labels: {
          useSeriesColors: false,
          color: '#fa6'
        },
        markers: {
          size: 0
        },
        formatter: function(seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
        },
        itemMargin: {
          horizontal: 3,
        }
      },
      stroke: {
        width: 1,
        colors: ['#220b01']
      },
    };

    const ratingDistributionBase = {
      ...stackedOptionsBase,
      colors: this.getColorGradient(10, endColor, startColor)
    }

    const strongestWeakestCategories = [
      'HTTYD1',
      'HTTYD2',
      'HTTYD3',
    ];

    const fandomAgeCategories = [
      'Combined',
      ...allPlatforms.map(x => x.name)
    ];

    const getMovieRatings = (isSeries) => {
      const data = [];
      for (let i = 1; i <= 10; i++) {
        data.push({
          name: `${i}`,
          data: [
            0,0,0
          ].slice(isSeries ? 1 : 0)
        })
      }
      return data;
    };

    const hasReachedEnd = !!window.localStorage.getItem('canSeeFilter');

    return {
      dataRows: [],
      correctionFactors: {
        platform: 1.1,
      },
      chartOptions: {
        platform: {
          ...radialOptionsBase,
          colors: this.getColorGradient(allPlatforms.length, startColor, endColor),
          labels: allPlatforms.map(x => x.name),
        },
        age: {
          ...stackedOptionsBase,
          colors: this.getColorGradient(6, startColor, endColor),
          xaxis: {
            categories: fandomAgeCategories
          }
        },
        fandomTime: {
          ...stackedOptionsBase,
          colors: this.getColorGradient(5, startColor, endColor),
          xaxis: {
            categories: fandomAgeCategories
          }
        },
        ranking: {
          ...donutOptionsBase,
          colors:  this.getColorGradient(6, startColor, endColor),
          labels: [
            '1 > 2 > 3',
            '1 > 3 > 2',
            '2 > 1 > 3',
            '2 > 3 > 1',
            '3 > 1 > 2',
            '3 > 2 > 1'
          ],
        },
        strongestWeakest: {
          ...stackedOptionsBase,
          colors: this.getColorGradient(5, startColor, endColor),
          xaxis: {
            categories: strongestWeakestCategories
          }
        },
        movieRatingsAvgOptions: {
          ...radialOptionsBase,
          colors: this.getColorGradient(5, startColor, endColor),
          labels: [
            'HTTYD1',
            'HTTYD2',
            'HTTYD3',
          ]
        },
        movieRatingDistributionOptions: {
          ...ratingDistributionBase,
          xaxis: {
            categories: strongestWeakestCategories
          }
        },
        seriesRatingsAvgOptions: {
          ...radialOptionsBase,
          colors: this.getColorGradient(3, startColor, endColor),
          labels: [
            'RoB/DoB',
            'RTTE',
          ]
        },
        seriesRatingDistributionOptions: {
          ...ratingDistributionBase,
          xaxis: {
            categories: ['R/DoB', 'RttE']
          }
        },
        thotfuryEndingRatingsAvgOptions: {
          ...radialOptionsBase,
          colors: this.getColorGradient(3, startColor, endColor),
          labels: [
            'Light Fury rating',
            'Ending rating',
          ]
        },
        thotfuryEndingRatingDistributionOptions: {
          ...ratingDistributionBase,
          xaxis: {
            categories: [
              'Light Fury rating',
              'Ending rating',
            ]
          }
        },
        betterIfNotOptions: {
          ...donutOptionsBase,
          colors: this.getColorGradient(4, startColor, endColor),
          labels: [
            'Agree',
            'Neither',
            'Disagree'
          ]
        },
      },
      chartData: {
        platform: [ 
          0,0,0,0,0
        ],
        age: [
          { name: '14-16 year', data: [ 0,0,0,0,0 ] },
          { name: '16-18 years', data: [ 0,0,0,0,0 ] },
          { name: '18-20 year', data: [ 0,0,0,0,0 ] },
          { name: '20+ year', data: [ 0,0,0,0,0 ] },
          { name: 'Age shy', data: [ 0,0,0,0,0 ] },
        ],
        fandomTime: [
          { name: '<1 year', data: [ 0,0,0,0,0 ]},
          { name: '1-2 years', data: [ 0,0,0,0,0 ] },
          { name: '3-4 year', data: [ 0,0,0,0,0] },
          { name: '5+ year', data: [ 0,0,0,0,0] },
          { name: 'Fandom time shy', data: [ 0,0,0,0,0] },
        ],
        ranking: [
          0,0,0,0,0,0
        ],
        movieRatingsAvg: [
          0, 0, 0
        ],
        movieRatings: [
          ...getMovieRatings()
        ],
        strongest: [
          {
            name: 'Plot',
            data: [ 0,0,0 ],
          }, {
            name: 'Themes',
            data: [ 0,0,0 ],
          }, {
            name: 'Emotion', 
            data: [ 0,0,0 ],
          }, {
            name: 'Characters',
            data: [ 0,0,0 ], 
          }, {
            name: 'Graphics or music',
            data: [ 0,0,0 ]
          }
        ],
        weakest: [
          {
            name: 'Plot',
            data: [ 0,0,0 ],
          }, {
            name: 'Themes',
            data: [ 0,0,0 ],
          }, {
            name: 'Emotion', 
            data: [ 0,0,0 ],
          }, {
            name: 'Characters',
            data: [ 0,0,0 ], 
          }, {
            name: 'Graphics or music',
            data: [ 0,0,0 ]
          }
        ],
        watchedSeries: [

        ],
        seriesRatingsAvg: [
          0, 0
        ],
        seriesRatings: [
          ...getMovieRatings(true)
        ],
        thotfuryEndingRatingsAvg: [
          0,
          0
        ],
        thotfuryEndingRatings: [
          ...getMovieRatings(true)
        ],
        betterIfNot: [
          1,
          0,
          0
        ]
      },
      filters: {
        platform: [allPlatforms.map(x => x.value)],
        age: [Age.AgeShy, Age.Year1214, Age.Year1416, Age.Year1618, Age.Year1820, Age.Year20],
        fandomTime: [FandomTime.FandomTimeShy, FandomTime.Year1, FandomTime.Year12, FandomTime.Year34, FandomTime.Year5],
        ranking: [Ranking.R123, Ranking.R132, Ranking.R213, Ranking.R231, Ranking.R312, Ranking.R321, Ranking.NotProvided],
        rating1Min: 1,
        rating1Max: 10,
        rating2Min: 1,
        rating2Max: 10,
        rating3Min: 1,
        rating3Max: 10,
        strong1: [StrongPoint.Plot, StrongPoint.Themes, StrongPoint.Characters, StrongPoint.Emotion, StrongPoint.GraphicsScore, StrongPoint.NotProvided],
        strong2: [StrongPoint.Plot, StrongPoint.Themes, StrongPoint.Characters, StrongPoint.Emotion, StrongPoint.GraphicsScore, StrongPoint.NotProvided],
        strong3: [StrongPoint.Plot, StrongPoint.Themes, StrongPoint.Characters, StrongPoint.Emotion, StrongPoint.GraphicsScore, StrongPoint.NotProvided],
        weak1: [StrongPoint.Plot, StrongPoint.Themes, StrongPoint.Characters, StrongPoint.Emotion, StrongPoint.GraphicsScore, StrongPoint.NotProvided],
        weak2: [StrongPoint.Plot, StrongPoint.Themes, StrongPoint.Characters, StrongPoint.Emotion, StrongPoint.GraphicsScore, StrongPoint.NotProvided],
        weak3: [StrongPoint.Plot, StrongPoint.Themes, StrongPoint.Characters, StrongPoint.Emotion, StrongPoint.GraphicsScore, StrongPoint.NotProvided],
        watchedSeries: [WatchedSeries.No, WatchedSeries.RDoB, WatchedSeries.RttE, WatchedSeries.Both],
        ratingRDoBMin: 1,
        ratingRDoBMax: 10,
        ratingRttEMin: 1,
        ratingRttEMax: 10,
        ratingThotfuryMin: 1,
        ratingThotfuryMax: 10,
        ratingThwEndingMin: 1,
        ratingThwEndingMax: 10,
        betterIfNot: [BetterIfNot.Agree, BetterIfNot.Neither, BetterIfNot.Disagree]
      },
      enabledFilters: {
        platform: false,
        age: false,
        fandomTime: false,
        movieRankings: false,
        rating1: false,
        rating2: false,
        rating3: false,
        strong1: false,
        strong2: false,
        strong3: false,
        weak1: false,
        weak2: false,
        weak3: false,
        watchedSeries: false,
        ratingRDoB: false,
        ratingRttE: false,
        ratingThotfury: false,
        ratingThwEnding: false,
        betterIfNot: false,
      },
      filterOptions: {
        platform: [
          ...allPlatforms,
        ],
        age: [
          { name: 'Age shy', value: Age.AgeShy },
          { name: '12-14', value: Age.Year1214 },
          { name: '14-16', value: Age.Year1416 },
          { name: '16-18', value: Age.Year1618 },
          { name: '18-20', value: Age.Year1820 },
          { name: '20+', value: Age.Year20 }
        ],
        fandomTime: [
          { name: 'Fandom time shy', value: FandomTime.FandomTimeShy },
          { name: 'Less than 1 year', value: FandomTime.Year1 },
          { name: '1-2 years', value: FandomTime.Year12 },
          { name: '3-4 years', value: FandomTime.Year34 },
          { name: '5+ years', value: FandomTime.Year5 }
        ],
        ranking: [
          { name: '1 > 2 > 3', value: Ranking.R123 },
          { name: '1 > 3 > 2', value: Ranking.R132 },
          { name: '2 > 1 > 3', value: Ranking.R213 },
          { name: '2 > 3 > 1', value: Ranking.R231 },
          { name: '3 > 1 > 2', value: Ranking.R312 },
          { name: '3 > 2 > 1', value: Ranking.R321 },
          { name: 'Not provided', value: Ranking.NotProvided }
        ],
        strongPoints: [
          { name: 'Plot <small>(cohesion, logic & intricacy of story)</small>', value: StrongPoint.Plot },
          { name: 'Themes', value: StrongPoint.Themes },
          { name: 'Characters', value: StrongPoint.Characters },
          { name: 'Emotional impact', value: StrongPoint.Emotion },
          { name: 'Visuals and/or score', value: StrongPoint.GraphicsScore },
          { name: 'Not provided', value: StrongPoint.NotProvided },
        ],
        betterIfNot: [
          { name: 'Agree', value: BetterIfNot.Agree },
          { name: 'Neither', value: BetterIfNot.Neither },
          { name: 'Disagree', value: BetterIfNot.Disagree }
        ],
        watchedSeries: [
          { name: 'No', value: WatchedSeries.No },
          { name: 'Only Riders/Defenders of Berk', value: WatchedSeries.RDoB },
          { name: 'Only Race to the Edge', value: WatchedSeries.RttE },
          { name: 'Watched both', value: WatchedSeries.Both }
        ]
      },
      filterCategoryExpansionStatus: {
        demographics: false,
        movies: false,
        movie1: false,
        movie2: false,
        movie3: false,
        thwExtras: false,
        series: false,
      },
      showFilter: hasReachedEnd,
      canShowFilter: hasReachedEnd,
      responseCount: -1,
      extraStatistics: {
        favNotBest: 0,
      },
      ses: { // Section Expanded Status
        filters: !this.$isMobile() && hasReachedEnd,
        demographics: !this.$isMobile(),
        movies: !this.$isMobile(),
        series: !this.$isMobile(),
        thwExtras: !this.$isMobile(),
        analystDesk: !this.$isMobile(),
        audit: !this.$isMobile(),
        specialThanks: !this.$isMobile(),
      },
      ees: { // Explainder Expanded Status
        demographics: true,
        movies: true,
        series: true,
        thwExtras: true,
      }
    };
  },
  computed: {
    showFluffText: function() {
      return this.ees.demographics && this.ees.movies && this.ees.series && this.ees.thwExtras;
    }
  },
  async mounted() {
    // initialize filter hiding/showing thing

    // ensure filter is collapsed the first time we open the page
    // allow having it uncollapsed on subsequent visits
    window.localStorage.setItem('canSeeFilter', "true");
    
    // get data
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/1qgddox_aheEegSoGKyLCYqUGUbBH3ItG7jvH9EWgKYM/gviz/tq?tqx=out:csv';
    let dataRows = (await Axios.get(sheetUrl)).data.split("\n");

    this.extraStatistics.favNotBest = 0;

    dataRows = dataRows.slice(1); // first row is column headers
    for (const row of dataRows) {
      const cols = row.split('",');
      const rowData = {
        timestamp: cols[0],
        platform: this.getPlatform(cols[1], cols[19]),
        ranking: this.getRankings(cols[2]),
        rating1: this.getNumber(cols[3]),
        rating2: this.getNumber(cols[4]),
        rating3: this.getNumber(cols[5]),
        ratingRDoB: this.getNumber(cols[6]),
        ratingRttE: this.getNumber(cols[7]),
        watchedSeries: this.getWatchedSeries(cols[6], cols[7]),
        strong1: this.getStrongPoint(cols[8]),
        strong2: this.getStrongPoint(cols[10]),
        strong3: this.getStrongPoint(cols[12]),
        weak1: this.getStrongPoint(cols[9]),
        weak2: this.getStrongPoint(cols[11]),
        weak3: this.getStrongPoint(cols[13]),
        ratingThotfury: this.getNumber(cols[14]),
        ratingThwEnding: this.getNumber(cols[15]),
        betterIfNot: this.getBetterIfNot(cols[16]),
        age: this.getAge(cols[17]),
        fandomTime: this.getFandomTime(cols[18]),
      };
      this.dataRows.push(rowData);
      
      // stuff for the fav/best extra statistics
      if ( 
        (rowData.ranking === Ranking.R123 && (rowData.rating1 < rowData.rating2 || rowData.rating1 < rowData.rating3 || rowData.rating2 < rowData.rating3))
        || (rowData.ranking === Ranking.R132 && (rowData.rating1 < rowData.rating2 || rowData.rating1 < rowData.rating3 || rowData.rating2 > rowData.rating3))
        || (rowData.ranking === Ranking.R213 && (rowData.rating2 < rowData.rating1 || rowData.rating2 < rowData.rating3 || rowData.rating1 < rowData.rating3))
        || (rowData.ranking === Ranking.R231 && (rowData.rating2 < rowData.rating1 || rowData.rating2 < rowData.rating3 || rowData.rating1 > rowData.rating3))
        || (rowData.ranking === Ranking.R312 && (rowData.rating3 < rowData.rating1 || rowData.rating3 < rowData.rating2 || rowData.rating1 < rowData.rating2))
        || (rowData.ranking === Ranking.R321 && (rowData.rating3 < rowData.rating1 || rowData.rating3 < rowData.rating2 || rowData.rating1 > rowData.rating2))
      ) {
        this.extraStatistics.favNotBest++;
      }
    }

    this.processData();
  },
  methods: {
    /**
     * Helper function for picking color gradients
     */
    getRGB(hexString) {
      const rgb = {
        r: 0,
        g: 0,
        b: 0
      };

      if (hexString.startsWith('#')) {
        hexString = hexString.substring(1);
      }
      if (hexString.length === 3) {
        rgb.r = parseInt(hexString.substring(0,1), 16);
        rgb.g = parseInt(hexString.substring(1,2), 16);
        rgb.b = parseInt(hexString.substring(2,3), 16);

        rgb.r *= rgb.r;
        rgb.g *= rgb.g;
        rgb.b *= rgb.b;
      } else {
        rgb.r = parseInt(hexString.substring(0,2), 16);
        rgb.g = parseInt(hexString.substring(2,4), 16);
        rgb.b = parseInt(hexString.substring(4,6), 16);
      }
      return rgb;
    },
    getColorStep(a, b, step) {
      return {
        r: Math.round((b.r - a.r) / step),
        g: Math.round((b.g - a.g) / step),
        b: Math.round((b.b - a.b) / step)
      };
    },
    getColorGradient(steps, start, end) {
      steps = steps - 1; // there's one too many otherwise
      const rgbStart = this.getRGB(start);
      const rgbEnd = this.getRGB(end);

      const step = this.getColorStep(rgbStart, rgbEnd, steps);

      const colorsOut = [
        start
      ];

      // keep start and end as they are, calculate in-betweens
      for (let i = 1; i < steps; i++) {
        colorsOut.push(`#${
            (rgbStart.r + (step.r * i)).toString(16)
          }${
            (rgbStart.g + (step.g * i)).toString(16)
          }${
            (rgbStart.b + (step.b * i)).toString(16)
          }`);
      }
      colorsOut.push(end);
      return colorsOut;
    },
    /**
     * HELPER FUNCTIONS FOR DATA LOADING
     */
    getNumber(str) {
      if (!str) {
        return undefined;
      }
      const n = +(str.replace(/"/g, '').replace(/\\/g, ''));
      if (isNaN(n)) {
        return undefined;
      }
      return n;
    },
    getPlatform(str, strExtras) {
      if (!str) {
        return Platform.Other;
      }
      str = str.replace(/"/g, '').replace(/\\/g, '');

      if (str.startsWith('The M')) { // main discord
        return Platform.MainDiscord;
      } else if (str.startsWith('The S')) { // subreddit
        return Platform.Subreddit;
      } else if (str.startsWith('A')) { // ... HTTYD Discord Other Than the One Above
        return Platform.OtherDiscord;
      } else {
        // other platforms
        strExtras = strExtras.toLowerCase();

        const instaIndex = strExtras.indexOf('insta');
        const tumblrIndex = strExtras.indexOf('tumblr');
        const wikiaIndex = strExtras.indexOf('wikia');
        const fandomIndex = strExtras.indexOf('fandom');

        return [{
          index: instaIndex,
          value: Platform.Instagram
        }, {
          index: tumblrIndex,
          value: Platform.Tumblr
        }, {
          index: wikiaIndex,
          value: Platform.Wikia,
        }, {
          index: fandomIndex,
          value: Platform.Wikia,
        }].sort().find(x => x.index >= 0)?.value || Platform.Other;
      }
    },
    getRankings(str) {
      if (!str) {
        return Ranking.NotProvided;
      }
      str = str.replace(/"/g, '').replace(/\\/g, '');
      switch (str) {
        case '1 > 2 > 3': return Ranking.R123;
        case '1 > 3 > 2': return Ranking.R132;
        case '2 > 1 > 3': return Ranking.R213;
        case '2 > 3 > 1': return Ranking.R231;
        case '3 > 1 > 2': return Ranking.R312;
        case '3 > 2 > 1': return Ranking.R321;
      }
      return Ranking.NotProvided;
    },
    getStrongPoint(str) {
      if (! str) {
        return StrongPoint.NotProvided;
      }
      str = str.replace(/"/g, '').replace(/\\/g, '');

      if (str.startsWith('Plot')) {
        return StrongPoint.Plot;
      } else if (str.startsWith('The')) {
        return StrongPoint.Themes;
      } else if (str.startsWith('Em')) {
        return StrongPoint.Emotion;
      } else if (str.startsWith('Char')) {
        return StrongPoint.Characters;
      } else if (str.startsWith('Ani')) {
        return StrongPoint.GraphicsScore;
      }
      return StrongPoint.NotProvided;
    },
    getBetterIfNot(str) {
      if (!str) {
        return BetterIfNot.Neither;
      }
      str = str.replace(/"/g, '').replace(/\\/g, '');
      if (str.startsWith('A')) {
        return BetterIfNot.Agree;
      }
      if (str.startsWith('N')) {
        return BetterIfNot.Neither;
      }
      if (str.startsWith('D')) {
        return BetterIfNot.Disagree;
      }
      return BetterIfNot.Neither;
    },
    getAge(str) {
      if (!str) {
        return Age.AgeShy;
      } 
      str = str.replace(/"/g, '').replace(/\\/g, '');
      if (str.startsWith('2')) {
        return Age.Year20;
      } else if (str.startsWith('12')) {
        return Age.Year1214;
      } else if (str.startsWith('14')) {
        return Age.Year1416;
      } else if (str.startsWith('16')) {
        return Age.Year1618;
      } else if (str.startsWith('18')) {
        return Age.Year1820;
      }
      return Age.AgeShy;
    },
    getFandomTime(str) {
      if (!str) {
        return FandomTime.FandomTimeShy;
      } 
      str = str.replace(/"/g, '').replace(/\\/g, '');
      if (str.startsWith('5')) {
        return FandomTime.Year5;
      } if (str.startsWith('3')) {
        return FandomTime.Year34;
      } if (str.startsWith('1')) {
        return FandomTime.Year12;
      } else if (str.startsWith('>') || str.startsWith('<')){
        // we need to account for this one typo where <1 was, for a brief period
        // labelled as >1. 
        return FandomTime.Year1;
      }

      return FandomTime.FandomTimeShy;
    },
    getEmptyRatingArray(length) {
      const data = [];
        for (let i = 1; i <= 10; i++) {
          data.push({
          name: `${i}`,
          data: new Array(length).fill(0)
        });
      }
      return data;
    },
    getWatchedSeries(rdob, rtte) {
      rdob = this.getNumber(rdob);
      rtte = this.getNumber(rtte);

      if (rdob && rtte) {
        return WatchedSeries.Both;
      } else if (rdob) {
        return WatchedSeries.RDoB;
      } else if (rtte) {
        return WatchedSeries.RttE;
      } else {
        return WatchedSeries.No;
      }
    },
    /**
     * FILTER FUNCTIONS
     */
    compareRange(min, max, value) {
      if (!value) {
        return false; // can't compare to undefined
      }
      if (min > max) {
        // this is "get me everything except middle" filter
        return value <= max || value >= min; 
      }
      return value <= max && value >= min;
    },
    toggleFilter(filterName) {
      this.enabledFilters[filterName] = !this.enabledFilters[filterName];
      this.$forceUpdate();
    },
    filterData(enabledFilters, filterConfig) {
      if (!enabledFilters) {
        enabledFilters = {...this.enabledFilters};
      }
      if (!filterConfig) {
        filterConfig = this.filters;
      }

      // quick sanity test if filters are defined
      // if filters aren't defined, or if they're disabled, we 
      // just return unfiltered data

      if (!enabledFilters) {
        return this.dataRows;
      } 
      let enabledFiltersCount = 0;
      for (const f in enabledFilters) {
        if (enabledFilters[f]) {
          enabledFiltersCount++;
        } else {
          // let's not unnecessarily keep disabled filters
          // in enabledFilters object
          delete enabledFilters[f];
        }
      }
      if (enabledFiltersCount === 0) {
        return this.dataRows;
      }

      // there is some filtering to be done. Let's get to work.
      let filteredData = [];
      let includeRow;
      for (const row of this.dataRows) {
        includeRow = true
        for (const enabledKey in enabledFilters) {
          if (enabledKey.startsWith('rat')) { // rating*
            includeRow &= this.compareRange(filterConfig[`${enabledKey}Min`], filterConfig[`${enabledKey}Max`], row[enabledKey]);
          } else if (Array.isArray(filterConfig[enabledKey])) {
            includeRow &= filterConfig[enabledKey].indexOf(row[enabledKey]) !== -1;
          } else {
            console.error("THIS KEY IS NEITHER RATING NOR ARRAY. Something's wrong — but we won't reject item.", enabledKey);
          }

          if (!includeRow) {
            break;
          }
        }
        if (includeRow) {
          filteredData.push(row);
        }
      }

      return filteredData;
    },
    /**
     * DATA PROCESSING FUNCTIONS
     */
    processDataWithFilters(enabledFilters, filterConfig) {
      const filteredData = this.filterData(enabledFilters, filterConfig);

      const chartData = {
        platform: new Array(allPlatforms.length).fill(0),
        age: [
          { name: '12-14 years', data: new Array(allPlatforms.length + 1).fill(0) },
          { name: '14-16 years', data: new Array(allPlatforms.length + 1).fill(0) },
          { name: '16-18 years', data: new Array(allPlatforms.length + 1).fill(0) },
          { name: '18-20 year', data: new Array(allPlatforms.length + 1).fill(0) },
          { name: '20+ year', data: new Array(allPlatforms.length + 1).fill(0) },
          { name: 'Age shy', data: new Array(allPlatforms.length + 1).fill(0) },
        ],
        fandomTime: [
          { name: '<1 year', data: new Array(allPlatforms.length + 1).fill(0) },
          { name: '1-2 years', data: new Array(allPlatforms.length + 1).fill(0) },
          { name: '3-4 year', data: new Array(allPlatforms.length + 1).fill(0) },
          { name: '5+ year', data: new Array(allPlatforms.length + 1).fill(0) },
          { name: 'Fandom time shy', data: new Array(allPlatforms.length + 1).fill(0) },
        ],
        ranking: [ 0,0,0,0,0,0 ],
        movieRatingsAvg: [ 0,0,0 ],
        movieRatings: this.getEmptyRatingArray(3),
        strongest: [
          {
            name: 'Plot',
            data: [ 0,0,0],
          }, {
            name: 'Themes',
            data: [ 0,0,0],
          }, {
            name: 'Characters',
            data: [ 0,0,0],
          }, {
            name: 'Emotion', 
            data: [ 0,0,0], 
          }, {
            name: 'Graphics or music',
            data: [ 0,0,0]
          }
        ],
        weakest: [
          {
            name: 'Plot',
            data: [ 0,0,0],
          }, {
            name: 'Themes',
            data: [ 0,0,0],
          }, {
            name: 'Characters',
            data: [ 0,0,0],
          }, {
            name: 'Emotion', 
            data: [ 0,0,0], 
          }, {
            name: 'Graphics or music',
            data: [ 0,0,0]
          }
        ],
        seriesViewership: [ 0,0 ],
        seriesRatingsAvg: [ 0,0 ],
        seriesRatings: this.getEmptyRatingArray(2),
        thotfuryEndingRatingsAvg: [ 0,0 ],
        thotfuryEndingRatings: this.getEmptyRatingArray(2),
        betterIfNot: [0,0, 0]
      };

      const ratingCounts = new Array(7).fill(0);

      for (const row of filteredData) {
        chartData.platform[row.platform]++;
        chartData.fandomTime[row.fandomTime].data[0]++;
        chartData.fandomTime[row.fandomTime].data[row.platform + 1]++;
        chartData.age[row.age].data[0]++;
        chartData.age[row.age].data[row.platform + 1]++;
        if (row.ranking !== Ranking.NotProvided) {
          chartData.ranking[row.ranking]++
        }
        if (row.rating1) {
          chartData.movieRatingsAvg[0] += row.rating1;
          chartData.movieRatings[row.rating1 - 1].data[0]++;
          ratingCounts[0]++;
        }
        if (row.rating2) {
          chartData.movieRatingsAvg[1] += row.rating2;
          chartData.movieRatings[row.rating2 - 1].data[1]++;
          ratingCounts[1]++;
        }
        if (row.rating3) {
          chartData.movieRatingsAvg[2] += row.rating3;
          chartData.movieRatings[row.rating3 - 1].data[2]++;
          ratingCounts[2]++;
        }
        if (row.ratingRDoB) {
          chartData.seriesRatingsAvg[0] += row.ratingRDoB;
          chartData.seriesRatings[row.ratingRDoB - 1].data[0]++;
          chartData.seriesViewership[0]++;
          ratingCounts[3]++;
        }
        if (row.ratingRttE) {
          chartData.seriesRatingsAvg[1] += row.ratingRttE;
          chartData.seriesRatings[row.ratingRttE - 1].data[1]++;
          chartData.seriesViewership[1]++;
          ratingCounts[4]++;
        }
        if (row.ratingThotfury) {
          chartData.thotfuryEndingRatingsAvg[0] += row.ratingThotfury;
          chartData.thotfuryEndingRatings[row.ratingThotfury - 1].data[0]++;
          ratingCounts[5]++;
        }
        if (row.ratingThwEnding) {
          chartData.thotfuryEndingRatingsAvg[1] += row.ratingThwEnding;
          chartData.thotfuryEndingRatings[row.ratingThwEnding - 1].data[1]++;
          ratingCounts[6]++;
        }

        if (row.strong1 !== StrongPoint.NotProvided) {
          chartData.strongest[row.strong1].data[0]++;
        }
        if (row.strong2 !== StrongPoint.NotProvided) {
          chartData.strongest[row.strong2].data[1]++;
        }
        if (row.strong3 !== StrongPoint.NotProvided) {
          chartData.strongest[row.strong3].data[2]++;
        }
        if (row.weak1 !== StrongPoint.NotProvided) {
          chartData.weakest[row.weak1].data[0]++;
        }
        if (row.weak2 !== StrongPoint.NotProvided) {
          chartData.weakest[row.weak2].data[1]++;
        }
        if (row.weak3 !== StrongPoint.NotProvided) {
          chartData.weakest[row.weak3].data[2]++;
        }
        chartData.betterIfNot[row.betterIfNot]++;
      }

      // get average ratings to 1-100
      for (const mar in chartData.movieRatingsAvg) {
        chartData.movieRatingsAvg[mar] = Math.round(chartData.movieRatingsAvg[mar] * 10 / (ratingCounts[mar] ? ratingCounts[mar] : 1))
      }
      chartData.seriesViewership[0] = Math.round(chartData.seriesViewership[0] * 100 / (filteredData.length ? filteredData.length : 1));
      chartData.seriesViewership[1] = Math.round(chartData.seriesViewership[1] * 100 / (filteredData.length ? filteredData.length : 1));
      chartData.seriesRatingsAvg[0] = Math.round(chartData.seriesRatingsAvg[0] * 10 / (ratingCounts[3] || 1));
      chartData.seriesRatingsAvg[1] = Math.round(chartData.seriesRatingsAvg[1] * 10 / (ratingCounts[4] || 1));
      chartData.thotfuryEndingRatingsAvg[0] = Math.round(chartData.thotfuryEndingRatingsAvg[0] * 10 / ( ratingCounts[5] || 1));
      chartData.thotfuryEndingRatingsAvg[1] = Math.round(chartData.thotfuryEndingRatingsAvg[1] * 10 / ( ratingCounts[6] || 1));

      return chartData;
    },
    processData() {
      this.chartData = this.processDataWithFilters(this.enabledFilters, this.filterConfig);
      this.responseCount = this.chartData.platform.reduce( (acc, x) => acc + x);
    },
    /**
     * UI-RELATED FUNCTIONS
     */
    showFluff(show) {
      this.ees.demographics = show;
      this.ees.movies = show;
      this.ees.series = show;
      this.ees.thwExtras = show;
    },
    toggleItem(item) {
      if (this.$isMobile()) {
        for (const i in this.ses) {
          this.ses[i] = item === i;
        }
      } else {
        this.ses[item] = !this.ses[item];
      }
    }
  }
}
</script>

<style lang="scss">

$color: #000;
$linkColor: #7A5130;
$separatorColor: #fa6;
$separatorOutline: #100a09;

b {
  font-weight: 700 !important;
}

a, a:visited {
  color: #fa6;
  text-decoration: none;

  padding-left: 0.1em;
  padding-right: 0.1em;

  font-weight: 600;

  filter: drop-shadow(0 0 0.1px $separatorOutline) drop-shadow(0 0 1px $separatorOutline) drop-shadow(0 0 1px $separatorOutline) //drop-shadow(0 0 2px $separatorOutline);

  // filter: drop-shadow(0 0 2px $separatorColor) drop-shadow(0 0 1px $separatorColor) drop-shadow(0 0 0.5px $separatorColor) drop-shadow(0 0 5px $separatorColor);
}
 a:hover, a:active {
   color: lighten($linkColor, 12)
}

.total-responses {
  font-size: 1.42em;
}


// @import url('https://fonts.googleapis.com/css?family=Overpass:100,400,700&display=swap');
@import url('https://fonts.googleapis.com/css?family=IM+Fell+DW+Pica+SC|IM+Fell+DW+Pica:400,400i|Overpass:400,800&display=swap');

footer {
  margin-top: 4em;
  border-top: 1px solid rgba($linkColor, 80%); // linear-gradient(90deg, rgba($linkColor, 0) 0%, rgba($linkColor, 1) 31% rgba($linkColor, 1) 69%, rgba($linkColor, 0) 100%);
  padding-top: 0.42em;
  background-color: rgba(#4e2b17, 0.69);
  font-size: 0.9em;
  color: #fa6;
  padding-bottom: 5em;
  text-align: center;
}


body { 
  background: url('./assets/bg.jpg');
  
  padding: 0px;
  margin: 0px;
  height: 100vh;

  color: $color;

  // breaks charts
  // text-shadow: 0 0 1.2em $linkColor, 0 0 3.2em $linkColor;
  // user-select: none;
}

.w100 {
  width: 100%;
}

.root {
  overflow-x: hidden;
}

#app {
  font-family: Overpass;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // background-color: rgba(0,0,0,0.8);
  // color: #f1f1f1;
  margin: 0px;
  padding: 0px;
  min-height: 100%;

  background: linear-gradient(90deg, rgba(97,38,12,0.25) 0%, rgba(0,0,0,0) 100%);
}

p, ul, code {
  filter: drop-shadow(0 0 2px #fa6) drop-shadow(0 0 3px #fa6) drop-shadow(0 0 16px rgba(#fa6, 0.5))  drop-shadow(0 0 32px #fa6) //drop-shadow(0 0 4em #fa6);
}

.im-fell-sc {
  font-family: 'IM FELL DW Pica SC', serif;
}
.im-fell {
  font-family: 'IM FELL DW Pica', serif;
}


h1 {
  font-family: 'IM Fell DW Pica', serif;
  // font-weight: 100;
  font-size: 5rem;
}

h2, h3 {
  text-align: center;
  font-family: 'IM Fell DW Pica SC', serif;
  font-size: 2.5rem;
  font-weight: 800;
}
h3 {
  font-size: 2rem;
  color: #7A5130;
}

.sticky-filter-area {
  position: relative;
}

.zero-height {
  max-height: 0px;
  overflow: hidden;
}

.filter-expanded {
  max-height: 5000px;
  transition: max-height 2.5s ease-in;
}

.filter {
  width: 100%;
  display: flex;
  // flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}

FilterCategory {
  width: 100%;
  max-width: 2480px;
  user-select: none;
}

.filter-col {
  min-width: 360px;
}

.is-sticky {
  .filter {
    // background-color: #000;
    position: fixed;
    top: 0;
    z-index: 999999;
  }
}

.chart-area-fullwidth {
  width: 100%;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  // align-items: center;
  justify-content: center;
  align-items: bottom;

  .chart-box {
    // align-items: left;
    max-width: 600px;
    width: 100%;
    justify-content: left;
  }
}

.root {
  display: flex;
  flex-flow: column;
}

.content {
  width: 100%;
  padding: 0em 1em;
  max-width: 1280px;
  justify-self: center;
  align-self: center;
  box-sizing: border-box;

}

.category-break {
  margin-top: 5rem;
  text-align: center;
  font-family: 'IM FELL DW Pica SC';
  // text-transform: uppercase;
  font-size: 3rem;
  // font-weight: 100;
  color: $separatorColor;
  filter: drop-shadow(0 0 2px $separatorOutline) drop-shadow(0 0 1px $separatorOutline) drop-shadow(0 0 0.5px $separatorOutline) //drop-shadow(0 0 2px $separatorOutline);
}
.category-break::before, .category-break::after {
  content: '';
  position: absolute;
  display: inline-block;
  width: 100vw;
  border-top: 1px solid $separatorColor;
}
.category-break::before {
  transform: translateX(-100vw) translateY(0.5em);
  margin-left: -0.75em;
}
.category-break::after {
  transform: translateY(0.5em);
  margin-left: 0.75em;
}

.button-row {
  margin-top: 2.5rem;
}

.button {
  margin: 0.2em;
  align-self: center;
  justify-self: center;
  color: #fa6;
  background-color: rgba(#4e2b17, 0.85);
  font-size: 1.25rem;
  padding: 0.5rem 2rem;
  cursor: pointer;
}
.button:hover {
  color: #fc8;
  background-color: rgba(#4e2b17, 0.69);
}

.center {
  text-align: center;
}

.reverse-wrap {
  flex-wrap: wrap-reverse;
  flex-direction: row-reverse;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.filter-toggle {
  cursor: pointer;

  position: relative;
  padding-left: 2em;
  margin-top: 0.25em;
  padding-top: 0.25em;
  width: 100%;

  color: #fa6;
  background: linear-gradient(90deg, rgba(#22160C, 0) 0%, rgba(#22160C, 0.69) 0.25em, rgba(#22160C, 0) 100%);

  &.checked {
    color: #000;
    background: linear-gradient(90deg, rgba(#fa6, 0) 0%, rgba(#fa6, 0.69) 0.25em, rgba(#fa6, 0) 100%);
  }

  &.checked::before, &.checked::after {
    position: absolute;
    left: 0.5em;
    top: 50%;
    transform: translateY(-50%);
    content: '';
    
    border-radius: 50%;
    // filter: drop-shadow(0 0 0.5px #22160C) drop-shadow(0 0 0.25px #22160C) drop-shadow(0 0 0.25px #22160C);
  }
  &.checked::before {
    height: 0.8em;
    width: 0.8em;
    background-color: #22160C;
  }
  &.checked::after {
    margin-left: 0.2em;
    height: 0.4em;
    width: 0.4em;
    background-color: #fa6;
  }
}
.filter-box {
  margin-top: 0.5em;

  &.disabled {
    opacity: 0.42;
    pointer-events: none;
  }
}

.section-toggle {
  cursor: pointer;
  color: darken($linkColor, 10);
  filter: drop-shadow(0 0 2px #fa6) drop-shadow(0 0 3px #fa6) drop-shadow(0 0 16px rgba(#fa6, 0.5))  drop-shadow(0 0 32px #fa6);
}

</style>

<style lang="scss">
// this is bars in radial bar chart
.apexcharts-series.apexcharts-radial-series {
  filter: drop-shadow(0 0 0.5px #000) drop-shadow(0 0 0.69px #000) drop-shadow(0 0 0.25px #000) drop-shadow(0 0 0.25px rgba(#000, 0.5));
}



.apexcharts-legend.apexcharts-align-center.position-left {
  padding: 20px;

  .apexcharts-legend-series {
   
    .apexcharts-legend-marker {
      filter: drop-shadow(0 0 2px #000) drop-shadow(0 0 1px #000) drop-shadow(0 0 0.5px #000) drop-shadow(0 0 12px rgba(#000, 0.5));
    }
    .apexcharts-legend-text {
      padding-left: 0.69em;
      filter: none;
    }
  }
}


.donut-chart .apexcharts-legend.apexcharts-align-center.position-left::before {
  position: absolute;
  display: inline-block;
  content: '';
  overflow: hidden;
  height: 280px;
  width: 280px;
  margin: 0 auto;
  border-radius: 50%;
  background-color: rgba(#22160C, 0.63);
  
}

.donut-chart .apexcharts-legend.apexcharts-align-center.position-left {
  padding: 0px;
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  justify-items: center;
  align-items: center;
  transform: translateY(-23px);

  .apexcharts-legend-series {
    // background: linear-gradient(90deg, rgba(#22160C, 0) 0%, rgba(#22160C, 0.69) 0.5em, rgba(#22160C, 0.42) 69%, rgba(#22160C, 0) 100%);
    // width: 150px;

    width: 130px;
    // padding: 0.2em 1em;

    // &:first-child {
    //   padding-top: 0.5em;
    // }
    // &:last-child {
    //   padding-bottom: 0.4em;
    // }
  }
}
</style>