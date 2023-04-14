export function getWebDomainName(stage: string): string {
  const subdomain = stage === 'prod' ? 'my' : stage;

  return `${subdomain}.${process.env.DOMAIN_NAME}`;
}

export function getApiDomainName(stage: string): string {
  const subdomain = stage === 'prod' ? 'api' : `${stage}-api`;

  return `${subdomain}.${process.env.DOMAIN_NAME}`;
}

export function getAssetCDNDomainName(stage: string): string {
  const subdomain = stage === 'prod' ? 'assets' : `${stage}-assets`;

  return `${subdomain}.${process.env.DOMAIN_NAME}`;
}
