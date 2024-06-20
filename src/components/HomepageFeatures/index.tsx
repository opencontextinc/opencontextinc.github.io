import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  img: string;
  alt: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Service Stewardship',
    img: require('@site/static/img/service_icon.png').default,
    alt: '',
    description: (
      <>
        Maps all your critical services to the team who supports, develops, or
        operates them.
      </>
    ),
  },
  {
    title: 'Security Context',
    img: require('@site/static/img/security_icon.png').default,
    alt: '',
    description: (
      <>
        Understand which teams are responsible for remediating security
        incidents or vulnerabilities.
      </>
    ),
  },
  {
    title: 'Incident OnCall',
    img: require('@site/static/img/oncall_icon.png').default,
    alt: '',
    description: (
      <>
        Know where to escalate during an incident, who owns critical systems,
        and locate essential documentation and resources during incidents.
      </>
    ),
  },
];

function Feature({ title, img, description, alt }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featurePng} src={img} alt={alt} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
