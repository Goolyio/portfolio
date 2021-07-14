import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from 'components/ProjectLayout';
import { Table, TableCell, TableRow } from 'components/Table';
import Link from 'components/Link';
import Footer from 'components/Footer';
import { useScrollRestore } from 'hooks';
import prerender from 'utils/prerender';
import usesBackground from 'assets/uses-background.mp4';
import usesBackgroundPlaceholder from 'assets/uses-background-placeholder.jpg';
import './index.css';

const Uses = () => {
  useScrollRestore();

  return (
    <Fragment>
      <Helmet>
        <title>Uses | Kieran Gookey</title>
        <meta
          name="description"
          content="A list of hardware and software I use to do my thing"
        />
      </Helmet>
      <ProjectContainer className="uses">
        <ProjectBackground
          src={usesBackground}
          placeholder={usesBackgroundPlaceholder}
          opacity={0.7}
          entered={!prerender}
        />
        <ProjectHeader
          title="Uses"
          description="A somewhat comprehensive list of tools, apps, hardware, and more that I use on a daily basis to design and code things."
        />
        <ProjectSection first className="uses__section">
          <ProjectSectionContent>
            <ProjectTextRow width="m">
              <ProjectSectionHeading>Design</ProjectSectionHeading>
              <ProjectSectionText>
                <ul>
                  <li>
                    <Link href="https://figma.com">Figma</Link> is my primary tool for UI
                    design these days. Made the switch from InVision in 2019 and haven't
                    looked back. I've also created{' '}
                    <Link href="https://figma.com/@codyb">a few plugins</Link> that you
                    can install.
                  </li>
                  <li>
                    Any motion graphics I create are created in Adobe After Effects. So
                    far I haven't found a non-Adobe product that's as good. If anyone has
                    suggestions please <Link href="/contact">message me</Link>.
                  </li>
                  <li>
                    For any 3D models I use{' '}
                    <Link href="https://blender.org">Blender</Link>. Since 2.8 it's become
                    way simpler to use and in a lot of ways better than expensive paid
                    tools like 3DS Max or Maya.
                  </li>
                </ul>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection first className="uses__section">
          <ProjectSectionContent>
            <ProjectTextRow width="m">
              <ProjectSectionHeading>Development</ProjectSectionHeading>
              <ProjectSectionText>
                <ul>
                  <li>
                    I use{' '}
                    <Link href="https://code.visualstudio.com">Visual Studio Code</Link>{' '}
                    as my text editor, with the Base 16 Tomorrow Dark theme and Jetbrains
                    Mono as my typeface of choice.
                  </li>
                  <li>
                    <Link href="https://mozilla.org/en-US/firefox/developer">
                      Firefox Development Edition
                    </Link>{' '}
                    is my main browser for both development and general use.
                  </li>
                  <li>
                    <Link href="https://reactjs.org">React</Link> is my front end
                    JavaScript library of choice. The component-centric mental model is
                    the first thing that truly made sense to me as a designer.
                  </li>
                  <li>
                    For 3D effects and image shaders, I use{' '}
                    <Link href="https://threejs.org">three.js</Link>. It has a bit of a
                    learning curve, but you can do some really powerful stuff with it. I
                    am an active contributor in the WebGL and WebXR space, where I have
                    made and collaborated on{' '}
                    <Link href="https://github.com/CodyJasonBennett">
                      some abstractions
                    </Link>
                    . You can check out some of my{` `}
                    <Link href="https://dribbble.codyb.co">experiments</Link> and{` `}
                    <Link href="/articles">articles</Link> about it.
                  </li>
                  <li>
                    For CSS I've used a myriad of pre-processors and css-in-js solutions
                    like{` `}
                    <Link href="https://styled-components.com">styled-components</Link>,
                    but these days I'm using vanilla CSS with{' '}
                    <Link href="https://postcss.org">PostCSS</Link> to get upcoming CSS
                    features today.
                  </li>
                  <li>
                    For JavaScript animations I use{' '}
                    <Link href="https://popmotion.io/api">Popmotion Pure 8</Link>, it's a
                    great way to add spring animations to three.js. All other animations
                    are CSS with{' '}
                    <Link href="https://reactcommunity.org/react-transition-group">
                      React Transition Group
                    </Link>{' '}
                    for enter/exit transitions.
                  </li>
                  <li>
                    For building and testing UI components in isolation I use{' '}
                    <Link href="https://storybook.js.org">Storybook</Link>. Check out the{' '}
                    <Link href="https://storybook.codyb.co">
                      storybook for this website
                    </Link>
                    .
                  </li>
                </ul>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection className="uses__section">
          <ProjectSectionContent>
            <ProjectTextRow stretch width="m">
              <ProjectSectionHeading>Hardware</ProjectSectionHeading>
              <ProjectSectionText style={{ marginBottom: 24 }}>
                I frequently work in the 3D and recording space, so my setup has had to
                keep up with it. This is the setup I use for my work, from design,
                development, modeling, to{' '}
                <Link href="https://youtube.codyb.co">
                  playing, recording, and mixing music
                </Link>
                .
              </ProjectSectionText>
              <Table>
                <TableRow>
                  <TableCell>
                    <strong>CPU</strong>
                  </TableCell>
                  <TableCell>AMD Ryzen 7 3800x</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>GPU</strong>
                  </TableCell>
                  <TableCell>NVIDIA RTX 2070</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Keyboard</strong>
                  </TableCell>
                  <TableCell>Keychron K8</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Mouse</strong>
                  </TableCell>
                  <TableCell>Razer DeathAdder Elite</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Headphones</strong>
                  </TableCell>
                  <TableCell>Beyderdynamic 770 Pro</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Microphone</strong>
                  </TableCell>
                  <TableCell>Lewitt LCT 440 Pure</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Interface</strong>
                  </TableCell>
                  <TableCell>Focusrite Scarlett Solo</TableCell>
                </TableRow>
              </Table>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};

export default Uses;
