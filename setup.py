
from setuptools import setup


setup(
    name='emopec',
    version='1.0',
    url='https://github.com/micked/emopec',
    license='All rights reserved',
    author='Michael Schantz Klausen, Mads Bonde, Morten Sommer',
    author_email='mskl@biosustain.dtu.dk',
    description='Calculate mRNA expression levels',
    #long_description=__doc__,
    packages=['emopec'],
    include_package_data=True,
    zip_safe=False,
    platforms='any',
    install_requires=[],
    package_data={'emopec': ['static/*', 'templates/*']},
)
